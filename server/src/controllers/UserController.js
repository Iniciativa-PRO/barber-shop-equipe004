const User = require('../models/User');

class UserController{

      static async create(req, res){

        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password })
        return res.json(user)

      }

      static async show(req, res){

        const users = await User.findAll()
        return res.json(users)

      }

}

module.exports = UserController;