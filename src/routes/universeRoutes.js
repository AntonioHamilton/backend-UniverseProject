const express = require('express');
const universeController = require('../Controllers/universeController')
const routes = new express.Router();

routes.get('/universe', universeController.Read);
routes.get('/universe/:tipo', universeController.FindByType);
routes.post('/universe', universeController.Create);
routes.put('/universe/:nome', universeController.Update);
routes.delete('/universe/:nome', universeController.Delete);

module.exports = routes;