const express = require("express");
const serversControllers = require("../controllers/serversControllers");

const serversRouters = express.Router();

serversRouters.get("/servers", serversControllers.getAll);

serversRouters.post("/servers", serversControllers.createServer);

serversRouters.post(
  "/servers/:serverId/hack/:netrunnerId",
  serversControllers.attemptServerHack
);

module.exports = serversRouters;
