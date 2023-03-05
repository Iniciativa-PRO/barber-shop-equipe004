const userRoutes = require('express').Router();
const SchedulingController = require('../controllers/SchedulingController');
const UserController = require('../controllers/UserController');


userRoutes.post('/agendamento/criar', SchedulingController.create);
userRoutes.get('/agendamento/buscar', SchedulingController.show);
userRoutes.put('/agendamento/atualizar', SchedulingController.update);
userRoutes.delete('/agendamento/deletar', SchedulingController.delete);


userRoutes.post('/usuario/criar', UserController.create);
userRoutes.get('/usuario/buscar', UserController.show);
userRoutes.put('/usuario/atualizar', UserController.update);
userRoutes.delete('/usuario/deletar', UserController.delete);
userRoutes.post('/usuario/login', UserController.login);


module.exports = userRoutes;