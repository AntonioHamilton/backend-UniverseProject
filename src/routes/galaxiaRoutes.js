const express = require("express");
const galaxiaController = require("../Controllers/galaxiaController");
const routes = new express.Router();

routes.post("/galaxia", galaxiaController.Create);
routes.get("/galaxia", galaxiaController.Read);
routes.put("/galaxia/:nome", galaxiaController.Update);
routes.delete("/galaxia/:nome", galaxiaController.Delete);

module.exports = routes;
