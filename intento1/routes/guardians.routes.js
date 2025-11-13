const { Router } = require("express");
const guardiansController = require("../controllers/guardians.controller");

const guardiansRouter = Router();

// Agregar filtros opcionales: skill, fragmento de nombre, rango de nivel
guardiansRouter.get("/guardians", guardiansController.getGuardians);

guardiansRouter.post("/guardians", guardiansController.createGuardian);

guardiansRouter.patch(
  "/guardians/:id/energy",
  guardiansController.updateGuardianEnergy
);

// Agregar o quitar items
guardiansRouter.patch(
  "/guardians/:id/items",
  guardiansController.updateGuardianItems
);

module.exports = guardiansRouter;
