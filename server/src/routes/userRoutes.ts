import express from 'express';
import SchedulingController from '../controllers/SchedulingController';
import UserController from '../controllers/UserController';
import tokenUser from '../middlewares/tokenUser';

const userRoutes = express.Router();

userRoutes.use(tokenUser);

userRoutes.get('/agendamento/buscar', SchedulingController.show);
userRoutes.put('/agendamento/atualizar', SchedulingController.update);
userRoutes.delete('/agendamento/deletar', SchedulingController.delete);

userRoutes.get('/buscar', UserController.show);
userRoutes.put('/atualizar', UserController.update);
userRoutes.delete('/deletar', UserController.delete);


export = userRoutes;