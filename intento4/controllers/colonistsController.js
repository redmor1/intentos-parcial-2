import { colonistsServices } from "../services/colonistsServices.js";

export const colonistsController = {
  getAll: async function getAll(req, res, next) {
    const filters = req.query;
    try {
      const colonists = await colonistsServices.getAll(filters);
      return res.status(200).json({ colonists });
    } catch (e) {
      throw e;
    }
  },
  createColonist: async function createColonist(req, res, next) {
    const data = req.body;
    if (!data) {
      throw new Error("Falta data en el body");
    }
    try {
      const colonist = await colonistsServices.createColonist(data);
      return res.status(200).json({ colonist });
    } catch (e) {
      throw e;
    }
  },
  healColonist: async function healColonist(req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Falta id en params");
    }
    try {
      const colonist = await colonistsServices.healColonist(id);
      return res.status(200).json({ colonist });
    } catch (e) {
      throw e;
    }
  },
};
