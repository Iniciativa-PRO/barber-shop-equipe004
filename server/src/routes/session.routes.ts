import express from 'express';
import SessionController from '../app/controllers/SessionController';

const sessionRoutes = express.Router();

sessionRoutes.post('/', SessionController.createSession);

export default sessionRoutes;