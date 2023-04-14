import express from 'express';
import ServiceController from '../app/controllers/ServiceController';
import tokenAdmin from '../middlewares/tokenAdmin';

const serviceRoutes = express.Router();

serviceRoutes.get('/', ServiceController.servicesShow);
serviceRoutes.post('/create', tokenAdmin, ServiceController.create);
serviceRoutes.get('/show', tokenAdmin, ServiceController.show);
serviceRoutes.put('/update', tokenAdmin, ServiceController.update);
serviceRoutes.delete('/delete', tokenAdmin, ServiceController.delete);

export default serviceRoutes;