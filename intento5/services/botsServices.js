import { botsRepository } from "../repositories/botsRepository.js";
import Joi from "joi";
import crypto from "crypto";

const createBotSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 100000)),
  name: Joi.string().min(3).max(100).required(),
  generation: Joi.number().integer().min(1).default(1),
  processing: Joi.number().integer().min(10).max(200).required(),
  memory: Joi.number().integer().min(10).max(200).default(10),
  battery: Joi.number().integer().min(0).max(100).default(100),
  load: Joi.number().integer().default(0),
  xp: Joi.number().integer().min(0).default(0),
  rank: Joi.number().integer().min(1).default(1),
  modules: Joi.array()
    .items(
      Joi.object()
        .keys({
          name: Joi.string().min(3).max(100).required(),
          weight: Joi.number().integer().min(1).required(),
          bonusType: Joi.string().valid("attack", "logic").required(),
        })
        .default([])
    )
    .default([]),
});

const patchBotSchema = Joi.object().keys({
  modules: Joi.array().items(
    Joi.object()
      .keys({
        name: Joi.string().min(3).max(100).required(),
        weight: Joi.number().integer().min(1).required(),
        bonusType: Joi.string().valid("attack", "logic").required(),
      })
      .required()
  ),
});

export const botsServices = {
  getAll: async function getAll(filters) {
    const bots = await botsRepository.getAll(filters);
    return bots;
  },
  createBot: async function createBot(data) {
    const { value, error } = createBotSchema.validate(data);
    let weightSum;
    if (value.modules.forEach((m) => (weightSum += m.weight)) > 100) {
      throw new Error("El weight sum debe ser menor a 100");
    }

    if (error) {
      throw new Error(error.details[0].message);
    }

    const bot = await botsRepository.create(value);
    return bot;
  },
  patchBot: async function patchBot(id, data) {
    const { value, error } = patchBotSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const bot = await botsRepository.patchModules(id, value);
    return bot;
  },
  getById: async function getById(botId) {
    const bot = await botsRepository.getById(botId);
    return bot;
  },
  updateBot: async function updateBot(botId, data) {
    const bot = await botsRepository.updateBot(botId, data);
    return bot;
  },
};
