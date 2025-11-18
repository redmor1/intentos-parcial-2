const battlesServices = require("../services/battlesServices");

const battlesControllers = {
  getAll: async function getAll(req, res, next) {
    const battles = await battlesServices.getAll();
    return res.status(200).json({ battles: battles });
  },

  beginDuel: async function beginDuel(req, res, next) {
    const data = req.body;
    const battle = await battlesServices.beginDuel(data);
    return res.status(200).json(battle);
  },
};

module.exports = battlesControllers;
