const express = require('express');
const AnaBrancaController = require('../Controllers/AnaBrancaController')
const routes = new express.Router();

routes.post('/anaBranca', AnaBrancaController.Create);
routes.get('/anaBranca', AnaBrancaController.Read);
routes.put('/anaBranca/:nome', AnaBrancaController.Update);
routes.delete('/anaBranca/:nome', AnaBrancaController.Delete);

module.exports = routes;