const barberShopController = require('../controllers/BarberShop');
const tokenAdmin = require('../middlewares/tokenAdmin');
const barberRoutes = require('express').Router();

barberRoutes.get('/servicos', barberShopController.servicesShow);

// Token de administrativo para todas as rotas dashboard.
barberRoutes.use(tokenAdmin);

barberRoutes.get('/agendamentos', barberShopController.schedulingsShow);
barberRoutes.get('/usuarios', barberShopController.usersShow);

barberRoutes.post('/servico/criar', barberShopController.serviceCreate);
barberRoutes.put('/servico/atualizar', barberShopController.serviceUpdate);
barberRoutes.delete('/servico/deletar', barberShopController.servicesDelete);

module.exports = barberRoutes;
