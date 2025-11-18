const express = require("express");
const netrunnersControllers = require("../controllers/netrunnersControllers");

const netrunnersRouters = express.Router();

netrunnersRouters.get("/netrunners", netrunnersControllers.getAll);

netrunnersRouters.post("/netrunners", netrunnersControllers.createNetrunner);

netrunnersRouters.patch(
  "/netrunners/:id/hardware",
  netrunnersControllers.updateNetrunnerHardware
);

netrunnersRouters.patch(
  "/netrunners/:id/ram",
  netrunnersControllers.updateNetrunnerRam
);

module.exports = netrunnersRouters;
