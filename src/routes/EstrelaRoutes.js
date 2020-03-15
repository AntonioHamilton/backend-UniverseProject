const express = require("express");
const EstrelaController = require("../Controllers/EstrelaController");
const routes = new express.Router();

routes.post("/estrela", EstrelaController.Create);
routes.get("/estrela", EstrelaController.Read);
routes.put("/estrela/:nome", EstrelaController.Update);
routes.delete("/estrela/:nome", EstrelaController.Delete);

module.exports = routes;
