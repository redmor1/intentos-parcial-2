const serversServices = require("../services/serversServices");

const serversControllers = {
  getAll: async function getAll(req, res, next) {
    const servers = await serversServices.getAll();
    return res.status(200).json({ servers: servers });
  },

  createServer: async function createServer(req, res, next) {
    const data = req.body;
    const server = await serversServices.createServer(data);
    return res.status(200).json(server);
  },

  attemptServerHack: async function attemptServerHack(req, res, next) {
    const serverId = Number(req.params.serverId);
    const netrunnerId = Number(req.params.netrunnerId);
    const attempt = await serversServices.attemptServerHack(
      serverId,
      netrunnerId
    );
    return res.status(200).json({ attempt });
  },
};

module.exports = serversControllers;
