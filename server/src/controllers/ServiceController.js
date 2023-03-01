const Service = require('../models/Service');

class ServiceController{

      static async create(req, res){

        const { cut, beard, hair, machine } = req.body;
        const service = await Service.create({ cut, beard, hair, machine })
        return res.json(service)

      }

      static async show(req, res){

        const services = await Service.findAll()
        return res.json(services)

      }

}

module.exports = ServiceController;