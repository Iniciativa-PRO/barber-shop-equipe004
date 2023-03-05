const barberShopController = require('../controllers/BarberShop');
const barberRoutes = require('express').Router();


barberRoutes.get('/agendamentos', barberShopController.schedulingsShow);
barberRoutes.get('/servicos', barberShopController.servicesShow);
barberRoutes.get('/usuarios', barberShopController.usersShow);

barberRoutes.post('/servico/criar', barberShopController.serviceCreate);
barberRoutes.put('/servico/atualizar', barberShopController.serviceUpdate);

module.exports = barberRoutes;

// npx prisma migrate dev --name create