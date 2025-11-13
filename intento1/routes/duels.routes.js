const { Router } = require("express");

const duelsRouter = Router();

// Filtros por ganador, fecha, diferencia minima de poder
duelsRouter.get("/duels", (req, res) => {});

duelsRouter.post("/duels", (req, res) => {});

module.exports = duelsRouter;
