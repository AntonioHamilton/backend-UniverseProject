const express = require('express');
const SateliteController = require('../Controllers/SateliteController')
const routes = new express.Router();

routes.post('/satelite', SateliteController.Create);
routes.get('/satelite', SateliteController.Read);
routes.put('/satelite/:nome', SateliteController.Update);
routes.delete('/satelite/:nome', SateliteController.Delete);

module.exports = routes;