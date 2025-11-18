const { Router } = require("express");
const duelsController = require("../controllers/duels.controller");

const duelsRouter = Router();

// Filtros por ganador, fecha, diferencia minima de poder
duelsRouter.get("/duels", duelsController.getDuels);

duelsRouter.post("/duels", duelsController.createDuel);

module.exports = duelsRouter;
