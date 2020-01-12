const express = require('express');
const PlanetaController = require('../Controllers/PlanetaController')
const routes = new express.Router();

routes.post('/planeta', PlanetaController.Create);
routes.get('/planeta', PlanetaController.Read);
routes.put('/planeta/:nome', PlanetaController.Update);
routes.delete('/planeta/:nome', PlanetaController.Delete);

module.exports = routes;