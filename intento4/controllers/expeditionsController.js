import { expeditionsServices } from "../services/expeditionsServices.js";

export const expeditionsController = {
  createExpedition: async function createExpedition(req, res, next) {
    const data = req.body;
    if (!data) {
      throw new Error("Falta data en el body");
    }
    try {
      const expedition = await expeditionsServices.createExpedition(data);
      return res.status(200).json({ expedition });
    } catch (e) {
      throw e;
    }
  },
  executeExpedition: async function executeExpedition(req, res, next) {
    const { expeditionId } = req.params;
    const { colonistId } = req.body;
    if (!expeditionId) {
      throw new Error("Falta id en params");
    }
    if (!colonistId) {
      throw new Error("Falta colonistId en body");
    }
    try {
      const expedition = await expeditionsServices.executeExpedition(
        Number(expeditionId),
        Number(colonistId)
      );
      return res.status(200).json({ expedition });
    } catch (e) {
      throw e;
    }
  },
};
