const prisma = require('../database/prisma')
const bcrypt = require('bcryptjs');
const { user } = require('../database/prisma');

// Todas as manipulações feitas no agendamento ou servico, são feitas através da tabela do usuário.

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

      const user = await prisma.user.create({
        data: {
          nome,
          email: email.toString().toLowerCase(),
          telefone,
          senha: password,
          agendamento: {
            create: {
              data,
              hora
            },
          },
          servico: {
            connect: {
              id: id_servico
            }
          }
        },
        include: { 
          servico: true, 
          agendamento: true 
        },
      });
      return res.status(200).json(user);
      
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err.message });
    }

  }

  static async show(req, res) {

    try {
      const schedulings = await prisma.user.findUnique({
        where: { id: req.body.id },
        select: {
          id: true,
          nome: true,
          agendamento: {
            select: {
              data: true,
              hora: true
            }
          },
          servico: {
            select: {
              nome: true,
              preco: true,
              descricao: true
            }
          }
        }
      })
      if (schedulings.agendamento == null ||
          schedulings.servico == null ) 
      {
          schedulings.agendamento = 'Sem agendamento.'
          schedulings.servico = 'Sem serviço.'
      }
      return res.status(200).json(schedulings);

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    }
  }

  static async update(req, res) {

    const { id, id_servico, data, hora } = req.body;

    try {
     const user = await prisma.user.update({
      where: { id },
      data: {
        agendamento: {
          update: {
            data,
            hora
          },
        },
        servico: {
          connect: {
            id: id_servico
          }
        }
      },
      include: {
        agendamento: true,
        servico: true
      }
    });
    return res.status(200).json(user);

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    } 
  }
 
  static async delete(req, res) {

    try {

     await prisma.user.update({
      where: {
        id: req.body.id
      }, 
      data: {
        agendamento: {
          delete: true
        },
        servico: {
          disconnect: true
        },
      },
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