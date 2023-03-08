const userRoutes = require('express').Router();
const SchedulingController = require('../controllers/SchedulingController');
const UserController = require('../controllers/UserController');
const tokenUser = require('../middlewares/tokenUser');

// Fazer primeiro agendamento, caso o usuário não possua um perfil no sistema.
// O perfil do usuário será automaticamente criado.
userRoutes.post('/agendamento/criar', SchedulingController.create);
userRoutes.post('/criar', UserController.create);
userRoutes.post('/entrar', UserController.login);
userRoutes.post('/sair', UserController.logout);

// Token para todas as rotas de GRUD.
userRoutes.use(tokenUser);

userRoutes.get('/agendamento/buscar', SchedulingController.show);
userRoutes.put('/agendamento/atualizar', SchedulingController.update);
userRoutes.delete('/agendamento/deletar', SchedulingController.delete);

userRoutes.get('/buscar', UserController.show);
userRoutes.put('/atualizar', UserController.update);
userRoutes.delete('/deletar', UserController.delete);


module.exports = userRoutes;