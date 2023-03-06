const bcrypt = require('bcryptjs');
const prisma = require('../database/prisma');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv/config'); 

class UserController{

      static async create(req, res){
        const { nome, email, telefone, senha } = req.body;

        // create a password
        const salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(senha, salt);

        try {
          const userExist = await prisma.user.findUnique({
            where: { email }
          });

          if (!userExist) {
            const user = await prisma.user.create({ 

              data: {
                nome, 
                email: email.toString().toLowerCase(), 
                telefone, 
                senha: password
              },
              select: {
                nome: true,
                email: true,
                telefone: true
              }
            });
            return res.json(user);
          }
          return res.json({message: 'Usuário já existe.' });
          
        } catch (err) {
          res.status(400).json({ err: err.message});
        } 
      }

      static async show(req, res){

        try {
          // if (req.userId != req.body.id)
          //     return res.status(401).json({ message: 'Você não tem acesso' })
          const user = await prisma.user.findUnique({
            where: { id: req.body.id },
            select: {
              id: true,
              nome: true,
              email: true,
              telefone: true,
              agendamento: {
                select: {
                  data: true,
                  hora: true,
                  servico: {
                    select: {
                      nome: true,
                      loja: true,
                      preco: true,
                      descricao: true
                    },
                  },
                },
              },
            },
          })
          return res.status(200).json(user)

        } catch (err) {
          res.status(400).json({ err: err.message});
        }

        
      }

      static async update(req, res){
        const { id, nome, email, telefone, senha } = req.body;

        if(email)
          return res.json({ message: 'Você não pode atualizar o email.' });

        if (senha) {
          const salt = bcrypt.genSaltSync(10);
          var password = bcrypt.hashSync(senha, salt);
        }

        try {
          const user = await prisma.user.update({ 
            where: { id },
            data: { 
              nome, 
              telefone, 
              senha: password 
            },
            select: {
              nome: true,
              email: true,
              telefone: true
            },
          });
          return res.json(user);

        } catch (err) {
          res.status(400).json({ err: err.message});
        }
      }

      static async delete(req, res){

        try {
          await prisma.user.delete({
            where: { id: req.body.id }
          })
          return res.json({ message: 'Usuário deletado com sucesso.' });

        } catch (err) {
          res.status(400).json({ err: err.message});
        }
      }

      static async login(req, res){
        const { email, senha } = req.body;

        try {
          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user)
             return res.json({ message: 'Usuário não existe.' });

          // Check password
          const passwordChecked = bcrypt.compareSync(senha, user.senha);
        
          if (!passwordChecked)
             return res.status(401).json({ message: 'Senha Incorreta.'});

          const token = jwt.sign({
            userId: user.id, 
          }, process.env.SECRET, {
            expiresIn: 100000
          });

          return res.status(200).json({ auth: true, token});

        } catch (err) {
          res.status(400).json({ err: err.message});
        }  
      }

}

module.exports = UserController;