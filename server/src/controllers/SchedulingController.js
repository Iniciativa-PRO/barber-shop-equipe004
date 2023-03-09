const prisma = require('../database/prisma')
const bcrypt = require('bcryptjs');
const { object, string, size, assert, define, number, array } = require('superstruct');
const isEmail = require('is-email');
const ShortUniqueId = require('short-unique-id');

class SchedulingController {

  static async create(req, res) {
    const { nome, email, telefone, id_servico, data, hora, senha } = req.body;

    if (!email)
      return res.json({ message: 'Email é obrigatório'});
    
    if (!telefone)
      return res.json({ message: 'Telefone é obrigatório'});

    if (!senha)
      return res.json({ message: 'Senha é obrigatória'});

      const User = object({
        nome: size(string(), 2, 20),
        email: define(email, isEmail),
        telefone: number(size(8, 15)),
        senha: size(string(), 6, 8)
      });

      const dataUser = { nome, email, telefone, senha };

      assert(dataUser, User);

    // Create password
    const salt = bcrypt.genSaltSync(10);
    dataUser.senha = bcrypt.hashSync(senha, salt);

    // Convert Phone Number to String
    dataUser.telefone = dataUser.telefone.toString()

    // Gerar ID
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    dataUser.id = code;

    // Tratar array de serviços, a variável connect substitui o connect do prisma.
    let connect = [];
    (function(){
      for (let i = 0; i < id_servico.length; i++) {
         connect.push({id: id_servico[i]});
      }  
    })();

    try {
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
          id: code,
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
        id,
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