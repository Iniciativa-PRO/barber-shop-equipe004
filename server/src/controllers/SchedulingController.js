const Scheduling = require('../models/SchedulingModel');

class SchedulingController{

      static async user(req, res){
          const user = Scheduling.findAll()
      }

}

module.exports = SchedulingController;