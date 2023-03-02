const User = require('../models/User');

class UserController{

      static async create(req, res){

        const { usuario, email, senha } = req.body;
        const user = await User.create({ usuario, email, senha })
        return res.json(user)

      }

      static async show(req, res){

        try {
          const user = await User.findByPk(req.body.id)
          return res.json(user)

        } catch (err) {
          console.log(err)
          res.status(400).json({ err: err.message})
        }

      }

      static async delete(req, res){

        try {
          const user = await User.destroy(req.body.id)
          return res.json(user)

        } catch (err) {
          console.log(err)
          res.status(400).json({ err: err.message})
        }

      }

}

module.exports = UserController;