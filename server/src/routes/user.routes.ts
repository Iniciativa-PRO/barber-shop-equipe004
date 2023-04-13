import express from 'express';
import UserController from '../app/controllers/UserController';
import tokenUser from '../middlewares/tokenUser';

const userRoutes = express.Router();

userRoutes.get('/users', UserController.usersShow);
userRoutes.post('/create-acount',UserController.create);

userRoutes.use(tokenUser);

userRoutes.get('/show', UserController.show);
userRoutes.put('/update', UserController.update);
userRoutes.delete('/delete', UserController.delete);


export = userRoutes;