const prisma = require('../database/prisma')
const processDataUser = require('../helpers/processDataUser');
const verifyIdService = require('../helpers/verifyIdService');

class SchedulingController {

  static async create(req, res) {

    const { nome, email, telefone, id_servico, data, hora, senha } = req.body;

    const connect = verifyIdService(id_servico);

    try {

      const dataUser = processDataUser(nome, email, telefone, senha);

      const userExist = await prisma.user.findUnique({
        where: { email },
      });

      if (userExist){
        return res.status(200).json({
          message: 'Usuário já existe, faça login para continuar.' 
        });
      };

      const scheduling = await prisma.scheduling.create({
         data: {
          id: dataUser.id,
          data,
          hora,
          servico: {
            connect, 
          },
          usuario: {
            create: dataUser
          },
         },
         include: {
          servico: {
            select: {
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          },
          usuario: {
            select: {
              id: true,
              nome: true,
              telefone: true,
              email: true,
            },
          },
         },
      });
      return res.status(200).json(scheduling);
  
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err.message });
    };
  };

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
            },
          },
        },
      });
      if (!schedulings) 
         return res.status(400).json({ message: 'Sem agendamento'});

      return res.status(200).json(schedulings);

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    };
  };

  static async update(req, res) {
    
    const { id, id_servico, data, hora } = req.body;

    const connect = verifyIdService(id_servico)

    try {
     const user = await prisma.scheduling.upsert({
      where: { usuarioId: id },
      update: {
        data,
        hora,
        servico: {
          connect,
        },
      },
      create: {
        id,
        data,
        hora,
        servico: {
          connect,
        },
        usuario: {
          connect: {
            id
          },
        },
      },
     });
     return res.status(200).json(user);

    } catch (err) {
      console.log(err);
      res.status(400).json({err: err.message});
    }; 
  };
 
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
    };
  };
};

module.exports = SchedulingController;