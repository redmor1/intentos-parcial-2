import { duelsRepository } from "../repositories/duelsRepository.js";
import Joi from "joi";
import { botsServices } from "./botsServices.js";
const createDuelSchema = Joi.object().keys({
  bot1: Joi.number().integer().min(1).required(),
  bot2: Joi.number().integer().min(1).required(),
});

export const duelsServices = {
  getById: async function getById(logicTestId) {
    const track = await duelsRepository.getById(logicTestId);
    return track;
  },
  createDuel: async function createDuel(data) {
    const { value, error } = createDuelSchema.validate(data);

    const bot1 = await botsServices.getById(value.bot1);
    const bot2 = await botsServices.getById(value.bot2);

    const modulesPower1 = bot1.modules
      .filter((m) => m.bonusType === "attack")
      .reduce((s) => s + s.weight);

    const modulesPower2 = bot1.modules
      .filter((m) => m.bonusType === "attack")
      .reduce((s) => s + s.weight);

    const stability1 = 100 - Math.abs(bot1.stability - bot1.memory) / 2;
    const stability2 = 100 - Math.abs(bot2.stability - bot2.memory) / 2;

    console.log(modulesPower1);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const duel = await duelsRepository.create(value);
    return duel;
  },
};
