const express = require('express');
const galaxiaController = require('../Controllers/AnaBrancaController')
const routes = new express.Router();

routes.post('/AnaBranca', galaxiaController.Create);
routes.get('/AnaBranca', galaxiaController.Read);
routes.put('/AnaBranca', galaxiaController.Update);
routes.delete('/AnaBranca', galaxiaController.Delete);

module.exports = routes;