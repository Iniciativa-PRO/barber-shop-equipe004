const prisma = require('../database/prisma')
const bcrypt = require('bcryptjs');

class SchedulingController {

  static async create(req, res) {

    const { nome, email, telefone, id_servico, data, hora, senha } = req.body;

    if (!email)
      return res.json({ message: 'Email é obrigatório'});
    
    if (!telefone)
      return res.json({ message: 'Telefone é obrigatório'});

    if (!senha)
      return res.json({ message: 'Senha é obrigatória'});

    // create a password
    const salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(senha, salt);

    try {

      const userExist = await prisma.user.findUnique({
        where: { email },
      });

      if (userExist){
        return res.status(200).json({
          message: 'Usuário já existe, faça login em sua conta.' 
        });
      }

      const scheduling = await prisma.scheduling.create({
         data: {
          data,
          hora,
          servico: {
            connect: {
              id: 1
            },
          },
          usuario: {
            create: {
              nome,
              email: email.toString().toLowerCase(),
              telefone,
              senha: password
            },
          },
         },
         include: {
          servico: true,
          usuario: true
         }
      })
      return res.status(200).json(scheduling);
  
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err.message });
    }

  }

  static async show(req, res) {

    try {
      const schedulings = await prisma.scheduling.findUnique({
        where: { usuarioId: req.body.id },
        select: {
          data: true,
          hora: true,
          servico: {
            select: {
              id: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            }
          }
        },
      })
      if (!schedulings) 
         return res.status(400).json({ message: 'Sem agendamento'});

      return res.status(200).json(schedulings);

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    }
  }

  static async update(req, res) {

    const { id, id_servico, data, hora } = req.body;

    try {
     const user = await prisma.scheduling.upsert({
      where: { usuarioId: id },
      update: {
        data,
        hora,
        servico: {
          connect: {
            id: id_servico
          },
        },
      },
      create: {
        data,
        hora,
        servico: {
          connect: {
            id: id_servico
          },
        },
        usuario: {
          connect: {
            id
          }
        }
      },
     });
     return res.status(200).json(user);

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    } 
  }
 
  static async delete(req, res) {

    try {
      await prisma.scheduling.delete({
        where: { id: req.body.id }
      });
      return res.status(200).json({ 
        message: 'Agendamento deletado com sucesso.' 
      });

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    } 
  }

}

module.exports = SchedulingController;