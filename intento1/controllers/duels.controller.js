const duelsService = require("../services/duels.service");

const duelsController = {
  createDuel: async function createDuel(req, res, next) {
    const data = req.body;

    const duel = await duelsService.createDuel(data);
    return res.status(200).json({ duel });
  },
  getDuels: async function getDuels(req, res, next) {
    let filters = req.query;
    if (filters.winner) {
      filters.winner = Number(filters.winner);
    }

    try {
      const duels = await duelsService.getDuels(filters);
      return res.status(200).json({ duels });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = duelsController;
