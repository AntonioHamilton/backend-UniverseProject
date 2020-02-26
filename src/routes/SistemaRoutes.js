const express = require("express");
const SistemaController = require("../Controllers/SistemaController");
const routes = new express.Router();

routes.post("/sistema", SistemaController.Create);
routes.get("/sistema", SistemaController.Read);
routes.put("/sistema/:nome", SistemaController.Update);
routes.delete("/sistema/:nome", SistemaController.Delete);

module.exports = routes;
