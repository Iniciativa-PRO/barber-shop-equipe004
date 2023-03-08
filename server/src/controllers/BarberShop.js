const prisma = require('../database/prisma');

class BarberShopController {

  static async schedulingsShow(req, res) {
    try {
      const scheduling = await prisma.scheduling.findMany({
        select: {
          data: true,
          hora: true,
          servico: {
            select: {
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            }
          },
          usuario: {
            select: {
              nome: true,
              telefone: true
            },
          },
        },
    });
    return res.status(200).json(scheduling);

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  static async servicesShow(req, res) {
    try {
      const services = await prisma.service.findMany({
        select: {
          id: true,
          nome: true,
          loja: true,
          preco: true,
          descricao: true
        }
      });
      return res.status(200).json(services);

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  static async usersShow(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          nome: true,
          email: true,
          telefone: true
        }
      });
      return res.status(200).json(users);

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  static async serviceCreate(req, res) {
    const { nome, loja, preco, descricao } = req.body;
    try {
      const service = await prisma.service.create({ 
        data: {
          nome,
          loja,
          preco,
          descricao
        }
       });
      return res.status(200).json(service);

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  static async serviceUpdate(req, res){
    const { id, nome, loja, preco, descricao } = req.body;
    try {
      const service = await prisma.service.update({
         where: { id },
         data: {
           nome,
           loja,
           preco,
           descricao
         }
      });
      return res.status(200).json(service);

    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err.message});
    }
  }

  static async servicesDelete(req, res) {
    try {
      await prisma.service.delete({
        where: { id: req.body.id }
      })
      return res.status(200).json({ message: 'Serviço deletado com sucesso.'});

    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
}

module.exports = BarberShopController;