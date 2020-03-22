const express = require("express");
const BuracoNegroController = require("../Controllers/BuracoNegroController");
const routes = new express.Router();

routes.get("/estrela", BuracoNegroController.Read);

module.exports = routes;
