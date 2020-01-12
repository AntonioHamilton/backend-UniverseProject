const express = require('express');
const EstrelaController = require('../Controllers/EstrelaController')
const routes = new express.Router();

routes.post('/estrela', EstrelaController.Create);
routes.get('/estrela', EstrelaController.Read);
routes.put('/estrela/:_id', EstrelaController.Update);
routes.delete('/estrela/:_id', EstrelaController.Delete);

module.exports = routes;