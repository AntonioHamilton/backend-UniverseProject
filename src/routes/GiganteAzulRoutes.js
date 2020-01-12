const express = require('express');
const GiganteAzulController = require('../Controllers/GiganteAzulController')
const routes = new express.Router();

routes.post('/giganteAzul', GiganteAzulController.Create);
routes.get('/giganteAzul', GiganteAzulController.Read);
routes.put('/giganteAzul/:nome', GiganteAzulController.Update);
routes.delete('/giganteAzul/:nome', GiganteAzulController.Delete);

module.exports = routes;