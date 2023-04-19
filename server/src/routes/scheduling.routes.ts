import express from 'express';
import SchedulingController from '../app/controllers/SchedulingController';
import tokenUser from '../middlewares/tokenUser';
import tokenAdmin from '../middlewares/tokenAdmin';

const schedulingRoutes = express.Router();

schedulingRoutes.post('/create', SchedulingController.create);
schedulingRoutes.get('/show', tokenUser, SchedulingController.show);
schedulingRoutes.put('/update', tokenUser, SchedulingController.update);
schedulingRoutes.delete('/delete', tokenUser, SchedulingController.delete);

schedulingRoutes.get('/search', tokenAdmin, SchedulingController.schedulingsSearch);

export default schedulingRoutes;
