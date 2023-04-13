import express from 'express';
import UserController from '../app/controllers/UserController';
import tokenUser from '../middlewares/tokenUser';
import tokenAdmin from '../middlewares/tokenAdmin';

const userRoutes = express.Router();

userRoutes.post('/create',UserController.create);
userRoutes.get('/show', tokenUser, UserController.show);
userRoutes.put('/update', tokenUser, UserController.update);
userRoutes.delete('/delete', tokenUser, UserController.delete);

userRoutes.get('/search', tokenAdmin, UserController.usersShow);

export = userRoutes;