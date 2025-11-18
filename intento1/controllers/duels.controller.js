const duelsService = require("../services/duels.service");

const duelsController = {
  createDuel: async function createDuel(req, res, next) {
    const data = req.body;
    try {
      const duel = await duelsService.createDuel(data);
      return res.status(200).json({ duel });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  },
  getDuels: async function getDuels(req, res, next) {
    const filters = req.query;
    console.log(filters);
    try {
      const duels = await duelsService.getDuels(filters);
      return res.status(200).json({ duels });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = duelsController;
