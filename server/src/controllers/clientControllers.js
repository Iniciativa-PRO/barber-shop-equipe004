const ClientRepository = require('../models/ClientModel');

class usuarios {

    static async findAll(req, res) {
       const usuarios = await ClientRepository.findAll();
       res.json(usuarios);
    }
}



module.exports = usuarios;