import barberShopController from '../controllers/BarberShop';
import express from 'express';
import authAdmin from '../middlewares/authAdmin';

const barberRoutes = express.Router()

barberRoutes.use(authAdmin);

barberRoutes.get('/agendamentos', barberShopController.schedulingsShow);
barberRoutes.get('/buscar/agendamento', barberShopController.schedulingsSearch);
barberRoutes.get('/usuarios', barberShopController.usersShow);

barberRoutes.post('/servico/criar', barberShopController.serviceCreate);
barberRoutes.put('/servico/atualizar', barberShopController.serviceUpdate);
barberRoutes.delete('/servico/deletar', barberShopController.servicesDelete);

export = barberRoutes;
