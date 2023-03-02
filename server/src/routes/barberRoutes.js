const SchedulingController = require('../controllers/BarberSchedulingController');
const barberRoutes = require('express').Router();


barberRoutes.get('/agendamentos', SchedulingController.SchedulingShow);
barberRoutes.get('/servicos', SchedulingController.ServiceShow);
barberRoutes.get('/usuarios', SchedulingController.UsersShow);

module.exports = barberRoutes;