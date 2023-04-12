import express from 'express';
import ServiceController from '../app/controllers/ServiceController';

const serviceRoutes = express.Router();

serviceRoutes.post('/', ServiceController.servicesShow);
serviceRoutes.post('/create', ServiceController.create);
serviceRoutes.get('/show', ServiceController.show);
serviceRoutes.put('/update', ServiceController.update);
serviceRoutes.delete('/delete', ServiceController.delete);

export default serviceRoutes;