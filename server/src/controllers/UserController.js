const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController{

      static async create(req, res){

        const { nome, email, telefone, senha } = req.body;

        try {
          const userExist = await User.findOne({
            where: { email }
          });

          if (!userExist) {
            const user = await User.create({ 
              nome, 
              email: email.toString().toLowerCase(), 
              telefone, 
              senha,
              id_servico: "",
              id_agendamento: ""
            })
            return res.json(user)
          }
          return res.json({message: 'Usuário já existe.' })
          
        } catch (err) {
          console.log(err)
          res.status(400).json({ err: err.message})
        }
        

      }

      static async show(req, res){

        try {
          const user = await User.findByPk(req.body.id)
          return res.json(user)

        } catch (err) {
          console.log(err)
          res.status(400).json({ err: err.message})
        }

      }

      static async update(req, res){

        const { id, nome, email, telefone, senha } = req.body;

        if(email)
          return res.json({ message: 'Você não pode atualizar o email.' })

        if (senha) {
          const salt = bcrypt.genSaltSync(10)
          var password = bcrypt.hashSync(senha, salt)
        }

        try {
          const user = await User.update(
            { nome, telefone, senha: password },
            { where: { id } }
          )
          return res.json(user)

        } catch (err) {
          console.log(err)
          res.status(400).json({ err: err.message})
        }

      }

      static async delete(req, res){

        try {
          const user = await User.destroy({
            where: { id: req.body.id }
          })
          return res.json({ message: 'Usuário deletado com sucesso.' })

        } catch (err) {
          console.log(err)
          res.status(400).json({ err: err.message})
        }

      }

      static async login(req, res){

        const { email, senha } = req.body;

        console.log(req.body);

        const user = await User.findOne({
          where: { email }
        })

        if (!user)
           return res.json({ message: 'Usuário não existe.' })

        // Check password
        const passwordChecked = bcrypt.compareSync(senha, user.senha)
        
        if (!passwordChecked)
           return res.json({ message: 'Senha Incorreta.'})

        return res.json({ message: 'Login efetuado com sucesso.'})
        
      }

}

module.exports = UserController;