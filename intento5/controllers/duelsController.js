import { duelsServices } from "../services/duelsServices.js";
export const duelsController = {
  createDuel: async function createDuel(req, res, next) {
    try {
      const data = req.body;
      const duel = await duelsServices.createDuel(data);
      return res.status(200).json({ duel });
    } catch (e) {
      throw e;
    }
  },
  getAll: async function getAll(req, res, next) {
    try {
      let filters = req.query;
      const duels = await duelsServices.getAll(filters, data);
      return res.status(200).json({ duels });
    } catch (e) {
      throw e;
    }
  },
};
