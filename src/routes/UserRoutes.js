const express = require('express');
const UserController = require('../Controllers/UserController');

const routes = new express.Router();

routes.get('/user', UserController.read);
routes.get('/user/:login', UserController.findOne);
routes.post('/user', UserController.create);
routes.put('/user/:login', UserController.Update);
routes.delete('/user/:login', UserController.Delete);

module.exports = routes;