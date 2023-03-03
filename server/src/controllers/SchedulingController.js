const Scheduling = require('../models/Scheduling');
const User = require('../models/User');
const Service = require('../models/Service');
const bcrypt = require('bcryptjs');

class SchedulingController {

  static async create(req, res) {

    const {
      nome,
      email,
      telefone,
      servico,
      data,
      hora,
      senha
    } = req.body;

    if (!email)
      return res.json({ message: 'Email é obrigatório'})
    
    if (!telefone)
      return res.json({ message: 'Telefone é obrigatório'})

    if (!senha)
      return res.json({ message: 'Senha é obrigatória'})

    // create a password
    const salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(senha, salt)

    try {

      const userExist = await User.findOne({
        where: { email }
      });

      if (userExist)
        return res.json({message: 'Usuário já existe, faça login em sua conta.' })
  
      const user = await User.create({
        nome,
        email: email.toString().toLowerCase(),
        telefone,
        senha: password
      });

      const service = await Service.create({ 
        nome: servico, 
        loja: 'Barber Shop',  
      })

      const data_agendamento = data + " " + hora;

      const scheduling = await Scheduling.create({
        data_agendamento,
        id_usuario: user.id,
        id_servico: service.id
      });

      const schedulingCreated = await Scheduling.findByPk(scheduling.id, {
        include: [{ association: 'usuario' }, { association: 'servico' }],
      })
      return res.json(schedulingCreated)
      
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }

  }

  static async show(req, res) {

    try {
      const schedulings = await Scheduling.findByPk(req.body.id, {
        attributes: ['id', 'data_agendamento'],
        include: [{ 
           association: 'usuario', attributes: ['id', 'nome', 'email', 'telefone'] 
        }, { 
           association: 'servico', attributes: ['id', 'nome'] 
        }],
      })
      return res.status(200).json(schedulings);

    } catch (err) {
      console.log(err)
      res.status(400).json({err: err.message});
    }

    
  }

  static async update(req, res) {

    const {id, data_agendamento, servico } = req.body;

    console.log(servico.nome)

    try {
      // upsert também pode criar uma linha, caso esta não exista,
      // este método retorna true, quando cria ou false, quando atualiza.
      const schedulingUpdate = await Scheduling.upsert({
        id,
        data_agendamento
      })
      return res.status(200).json(schedulingUpdate);

    } catch (err) {
      console.log(err)
      res.status(400).json({err: err.message});
    } 
  }

  static async delete(req, res) {

    try {
      const schedulingDelete = await Scheduling.findOne({
        where: { id: req.body.id }
      })
      await schedulingDelete.destroy();
      // Não seria necessário fazer duas consultas SQL, mas parece que a função *cascade* do sequelize não está funcionando corretamente.
      return res.status(200).json({ 
        message: 'Agendamento deletado com sucesso.' 
      });

    } catch (err) {
      console.log(err)
      res.status(400).json({err: err.message});
    }
  }

}

module.exports = SchedulingController;