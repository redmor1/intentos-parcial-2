import { alchemistsServices } from "../services/alchemistsServices.js";

export const alchemistsControllers = {
  getAll: async function getAll(req, res, next) {
    const filters = req.query;
    const alchemists = await alchemistsServices.getAll(filters);
    return res.status(200).json({ alchemists });
  },
  createAlchemist: async function createAlchemist(req, res, next) {
    const data = req.body;
    const alchemist = await alchemistsServices.createAlchemist(data);
    return res.status(200).json({ alchemist });
  },
  addArtifactToInventory: async function addArtifactToInventory(
    req,
    res,
    next
  ) {},
};

export default alchemistsControllers;
