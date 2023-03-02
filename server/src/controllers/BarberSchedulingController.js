const Scheduling = require('../models/Scheduling');
const Service = require('../models/Service');
//const User = require('../models/User');
//const Service = require('../models/Service');

class BarberSchedulingController {

  static async SchedulingShow(req, res) {

    try {
      const schedulings = await Scheduling.findAll({
        attributes: ['id', 'data_agendamento'],
        include: [{ 
          association: 'usuario', attributes: ['id', 'nome', 'email', 'telefone'] 
        }, { 
          association: 'servico', attributes: ['id', 'nome'] 
        }],
      })
      return res.status(200).json(schedulings)
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
    
  }

  static async ServiceShow(req, res) {

    try {
      const services = await Service.findAll()
      return res.status(200).json(services)
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  }

  static async UsersShow(req, res) {

    try {
      const users = await Service.findAll()
      return res.status(200).json(users)
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  }

}

module.exports = BarberSchedulingController;