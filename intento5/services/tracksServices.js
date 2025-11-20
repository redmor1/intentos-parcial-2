import { tracksRepository } from "../repositories/tracksRepository.js";
import Joi from "joi";
import crypto from "crypto";
import { botsServices } from "./botsServices.js";
import {
  baseXpFormula,
  evaluateFormula,
  levelUp,
  penaltyFormula,
} from "../utils/formulas.js";

const createTrackSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 100000)),
  name: Joi.string().min(3).max(100).required(),
  complexity: Joi.number().integer().min(1).max(10).required(),
  length: Joi.number().integer().min(0).required(),
  energyCostBase: Joi.number().integer().min(1).required(),
  processingDemand: Joi.number().integer().min(1).required(),
});

export const tracksServices = {
  createTrack: async function createTrack(data) {
    const { value, error } = createTrackSchema.validate(data);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const track = await tracksRepository.create(value);
    return track;
  },
  train: async function train(trackId, botId) {
    const track = await tracksRepository.getById(trackId);
    const bot = await botsServices.getById(botId);
    let attempt = {
      botId: botId,
      trackId: trackId,
      xpGained: null,
    };
    let energyCost =
      evaluateFormula(track.energyCostBase, track) +
      track.complexity * 2 +
      Math.floor(track.length / 50);

    // si el processing es insuficiente
    if (bot.processing < track.processingDemand) {
      energyCost += penaltyFormula(track, bot);
    }

    let xpBase = baseXpFormula(track);
    let xpFinal = 0;

    if (
      bot.processing >= track.processingDemand &&
      bot.memory >= track.processingDemand
    ) {
      xpFinal = Math.floor(xpBase * 1.2);
    } else {
      xpFinal = xpBase;
    }

    if (bot.battery < energyCost) {
      throw new Error(
        "El bot no tiene la energia suficiente, no puede entrenar"
      );
    }
    bot.xp += xpFinal;
    // level up bot
    levelUp(bot);
    // actualizar bot
    await botsServices.updateBot(botId, bot);
    // xp gained
    attempt.xpGained = xpFinal;

    const trackAttempt = await tracksRepository.createTrackAttempt(attempt);
    return trackAttempt;
  },
  getById: async function getById(trackId) {
    const track = await tracksRepository.getById(trackId);
    return track;
  },
};
