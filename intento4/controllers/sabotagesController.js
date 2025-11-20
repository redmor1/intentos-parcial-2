import { sabotagesServices } from "../services/sabotagesServices.js";

export const sabotagesController = {
  executeSabotage: async function executeSabotage(req, res, next) {
    const { attackerId, defenderId } = req.body;
    if (!attackerId) {
      throw new Error("Falta attackerId en body");
    }
    if (!defenderId) {
      throw new Error("Falta defenderId en body");
    }
    try {
      const sabotage = await sabotagesServices.executeSabotage(
        attackerId,
        defenderId
      );
      return res.status(200).json({ sabotage });
    } catch (e) {
      throw e;
    }
  },
};
