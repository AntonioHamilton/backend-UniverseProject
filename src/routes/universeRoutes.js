const express = require('express');
const universeController = require('../Controllers/galaxiaController')
const routes = new express.Router();

routes.get('/universe', universeController.Read);
routes.post('/universe', universeController.Create);
routes.put('/universe/:nome', universeController.Update);
routes.delete('/universe/:nome', universeController.Delete);

module.exports = routes;