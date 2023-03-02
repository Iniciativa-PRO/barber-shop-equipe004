const userRoutes = require('express').Router();
const SchedulingController = require('../controllers/SchedulingController');
const ServiceController = require('../controllers/ServiceController');
const UserController = require('../controllers/UserController');


userRoutes.post('/agendamento/criar', SchedulingController.create);
userRoutes.get('/agendamento/buscar/:id', SchedulingController.show);
userRoutes.put('/agendamento/atualizar', SchedulingController.update);
userRoutes.delete('/agendamento/deletar/:id', SchedulingController.delete);

//userRoutes.post('/servico', ServiceController.update);
//userRoutes.post('/servico', ServiceController.delete);


//userRoutes.post('/usuario', UserController.update);
userRoutes.delete('/usuario', UserController.delete);
userRoutes.get('/:id/usuario', UserController.show);



module.exports = userRoutes;