const userRoutes = require('express').Router();
const SchedulingController = require('../controllers/SchedulingController');
const UserController = require('../controllers/UserController');
const tokenUser = require('../middlewares/tokenUser');

userRoutes.post('/usuario/login', UserController.login);
userRoutes.post('/agendamento/criar', SchedulingController.create);
userRoutes.post('/usuario/criar', UserController.create);

userRoutes.use(tokenUser);

userRoutes.get('/agendamento/buscar', SchedulingController.show);
userRoutes.put('/agendamento/atualizar', SchedulingController.update);
userRoutes.delete('/agendamento/deletar', SchedulingController.delete);

userRoutes.get('/usuario/buscar', UserController.show);
userRoutes.put('/usuario/atualizar', UserController.update);
userRoutes.delete('/usuario/deletar', UserController.delete);


module.exports = userRoutes;