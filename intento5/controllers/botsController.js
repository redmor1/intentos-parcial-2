import { botsServices } from "../services/botsServices.js";
export const botsController = {
  getAll: async function getAll(req, res, next) {
    try {
      let filters;
      if (req.query) {
        filters = req.query;
      }

      const bots = await botsServices.getAll(filters);
      return res.status(200).json({ bots });
    } catch (e) {
      throw e;
    }
  },
  createBot: async function createBot(req, res, next) {
    try {
      const data = req.body;
      const bot = await botsServices.createBot(data);
      return res.status(200).json({ bot });
    } catch (e) {
      throw e;
    }
  },
  patchBot: async function patchBot(req, res, next) {
    try {
      let id = req.params.id;
      if (!id) {
        throw new Error("Falta el id en los params");
      }
      id = Number(id);
      const data = req.body;

      const bot = await botsServices.patchBot(id, data);
      return res.status(200).json({ bot });
    } catch (e) {
      throw e;
    }
  },
};
