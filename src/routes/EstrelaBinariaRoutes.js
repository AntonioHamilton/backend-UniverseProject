const express = require('express');
const EstrelaBinariaController = require('../Controllers/EstrelaBinariaController')
const routes = new express.Router();

routes.post('/estrelaBinaria', EstrelaBinariaController.Create);
routes.get('/estrelaBinaria', EstrelaBinariaController.Read);
routes.put('/estrelaBinaria/:nome', EstrelaBinariaController.Update);
routes.delete('/estrelaBinaria/:nome', EstrelaBinariaController.Delete);

module.exports = routes;