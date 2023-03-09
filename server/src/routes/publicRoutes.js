const barberShopController = require('../controllers/BarberShop');
const SchedulingController = require('../controllers/SchedulingController');
const UserController = require('../controllers/UserController');
const publicRoutes = require('express').Router();

publicRoutes.get('/servicos', barberShopController.servicesShow);

// Fazer primeiro agendamento, caso o usuário não possua um perfil no sistema.
// O perfil do usuário será automaticamente criado.
publicRoutes.post('/agendamento/criar', SchedulingController.create);
publicRoutes.post('/criar-conta',UserController.create);
publicRoutes.post('/entrar', UserController.login);

module.exports = publicRoutes;