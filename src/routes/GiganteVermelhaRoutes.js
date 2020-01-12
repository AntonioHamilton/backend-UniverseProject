const express = require('express');
const GiganteVermelhaController = require('../Controllers/GiganteVermelhaController')
const routes = new express.Router();

routes.post('/giganteVermelha', GiganteVermelhaController.Create);
routes.get('/giganteVermelha', GiganteVermelhaController.Read);
routes.put('/giganteVermelha/:nome', GiganteVermelhaController.Update);
routes.delete('/giganteVermelha/:nome', GiganteVermelhaController.Delete);

module.exports = routes;