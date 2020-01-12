const express = require('express');
const AnaVermelhaController = require('../Controllers/AnaVermelhaController')
const routes = new express.Router();

routes.post('/anaVermelha', AnaVermelhaController.Create);
routes.get('/anaVermelha', AnaVermelhaController.Read);
routes.put('/anaVermelha/:nome', AnaVermelhaController.Update);
routes.delete('/anaVermelha/:nome', AnaVermelhaController.Delete);

module.exports = routes;