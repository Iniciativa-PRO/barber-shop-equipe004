const Scheduling = require('../models/Scheduling');
const User = require('../models/User');

class SchedulingController{

      static async create(req, res){

        const { id, servico } = req.body;

        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({ err: "Usuario não existe."})
        }

        const data_agendamento = new Date().getTime;
        const scheduling = Scheduling.create({ data_agendamento, id, servico });
      }

}

module.exports = SchedulingController;