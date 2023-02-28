const routes = require('express').Router();
const usuarios = require('../controllers/clientControllers');

routes.get('/usuarios', usuarios.findAll);

module.exports = routes ;