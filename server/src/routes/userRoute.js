const userRoute = require('express').Router();
const ServiceController = require('../controllers/ServiceController');
const UserController = require('../controllers/UserController');


userRoute.post('/usuario', UserController.create);
userRoute.get('/usuarios', UserController.show);
userRoute.post('/usuario/:id/agendar/servico', ServiceController.create);
userRoute.get('/usuario/:id/show/servico', ServiceController.show);



module.exports = userRoute;