const express = require("express");
const BuracoNegroController = require("../Controllers/BuracoNegroController");
const routes = new express.Router();

routes.get("/buracoNegro", BuracoNegroController.Read);

module.exports = routes;
