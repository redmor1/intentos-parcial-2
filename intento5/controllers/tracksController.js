import { tracksServices } from "../services/tracksServices.js";
export const tracksController = {
  createTrack: async function createTrack(req, res, next) {
    try {
      const data = req.body;
      const track = await tracksServices.createTrack(data);
      return res.status(200).json({ track });
    } catch (e) {
      throw e;
    }
  },
  train: async function train(req, res, next) {
    try {
      let trackId = req.params.trackId;
      if (!trackId) {
        throw new Error("Falta el trackId en los params");
      }
      trackId = Number(trackId);
      let botId = req.params.botId;
      if (!botId) {
        throw new Error("Falta el botId en los params");
      }
      botId = Number(botId);

      const trackAttempt = await tracksServices.train(trackId, botId);
      return res.status(200).json({ trackAttempt });
    } catch (e) {
      throw e;
    }
  },
};
