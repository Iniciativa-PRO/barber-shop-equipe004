const User = require('../models/User');

class UserController{

      static async create(req, res){

        const { usuario, email, senha } = req.body;
        const user = await User.create({ usuario, email, senha })
        return res.json(user)

      }

      static async show(req, res){

        const users = await User.findAll()
        return res.json(users)

      }

}

module.exports = UserController;