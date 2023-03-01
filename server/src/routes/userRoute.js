const userRoute = require('express').Router();
const SchedulingController = require('../controllers/SchedulingController');
const ServiceController = require('../controllers/ServiceController');
const UserController = require('../controllers/UserController');


userRoute.post('/usuario', UserController.create);
userRoute.get('/usuarios', UserController.show);
userRoute.post('/usuario/agendar/servico', SchedulingController.create);
//userRoute.get('/usuario/show/servico', ServiceController.show);



module.exports = userRoute;