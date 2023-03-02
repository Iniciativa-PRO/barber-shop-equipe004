const Scheduling = require('../models/Scheduling');
const User = require('../models/User');
const Service = require('../models/Service');
const { where } = require('sequelize');

class SchedulingController {

  static async create(req, res) {

    const {
      id,
      nome,
      email,
      telefone,
      servico,
      data,
      hora,
      senha
    } = req.body;

    try {

      const user = await User.create({
        nome,
        email,
        telefone,
        senha
      });

      const service = await Service.create({ nome: servico })

      const data_agendamento = data + " " + hora;

      const scheduling = await Scheduling.create({
        data_agendamento,
        id_usuario: user.id,
        id_servico: service.id
      });

      const schedulingCreated = await Scheduling.findByPk(scheduling.id, {
        include: [{ association: 'usuario' }, { association: 'servico' }],
      })

      return res.json({
        message: 'Agendamento criado com Sucesso',
        data: schedulingCreated
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({ err: err.message })
    }

  }

  static async show(req, res) {

    try {
      const schedulings = await Scheduling.findByPk(req.params.id, {
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

    const {id, data, hora } = req.body;

    try {
      // upsert também pode criar uma linha, caso esta não exista,
      // este método retorna true, quando cria ou false, quando atualiza.
      const schedulingUpdate = await Scheduling.upsert({
        id,
        data_agendamento: data + " " + hora
      })
      return res.status(200).json(schedulingUpdate);

    } catch (err) {
      console.log(err)
      res.status(400).json({err: err.message});
    } 
  }

  static async delete(req, res) {

    try {
      const schedulingUpdate = await Scheduling.destroy({
        where: { id: req.params.id }
      })
      return res.status(200).json({ message: 'Agendamento deletado com sucesso.' });

    } catch (err) {
      console.log(err)
      res.status(400).json({err: err.message});
    }
  }

}

module.exports = SchedulingController;