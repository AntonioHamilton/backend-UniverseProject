const express = require('express');
const EstrelaBinariaController = require('../Controllers/EstrelaBinariaController')
const routes = new express.Router();

routes.post('/anaVermelha', EstrelaBinariaController.Create);
routes.get('/anaVermelha', EstrelaBinariaController.Read);
routes.put('/anaVermelha/:nome', EstrelaBinariaController.Update);
routes.delete('/anaVermelha/:nome', EstrelaBinariaController.Delete);

module.exports = routes;