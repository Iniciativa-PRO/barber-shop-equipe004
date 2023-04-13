import express from 'express';
import authAdmin from '../middlewares/authAdmin';
import SchedulingController from '../app/controllers/SchedulingController';

const schedulingRoutes = express.Router()

//adminRoutes.use(authAdmin);

schedulingRoutes.get('search', SchedulingController.schedulingsSearch);

schedulingRoutes.get('/create', SchedulingController.create);
schedulingRoutes.get('/show', SchedulingController.show);
schedulingRoutes.put('/update', SchedulingController.update);
schedulingRoutes.delete('/delete', SchedulingController.delete);

export default schedulingRoutes;
