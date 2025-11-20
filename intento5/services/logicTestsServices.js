import { logicTestsRepository } from "../repositories/logicTestsRepository.js";
import Joi from "joi";
import crypto from "crypto";
import { evaluateFormula } from "../utils/formulas.js";
import { botsServices } from "./botsServices.js";

const createLogicTestSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 100000)),
  title: Joi.string().min(3).max(100).required(),
  difficulty: Joi.number().integer().min(1).required(),
  timeLimit: Joi.number().integer().min(1).required(),
  baseRewardFormula: Joi.string().min(3).required(),
  penaltyFormula: Joi.string().min(3).required(),
});

const attemptLogicTestSchema = Joi.object().keys({
  botId: Joi.number().integer().min(1).required(),
  logicTestId: Joi.number().integer().min(1).required(),
  timeUsed: Joi.number().integer().min(1).required(),
});

export const logicTestsServices = {
  attemptLogicTest: async function attemptLogicTest(id, data) {
    const { value, error } = attemptLogicTestSchema.validate(data);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const logicTest = await logicTestsRepository.getById(value.logicTestId);
    const bot = await botsServices.getById(value.botId);
    if (value.timeUsed >= logicTest.timeLimit) {
      throw new Error("Error, se sobrepaso del limite de tiempo");
    }
    let logicTestAttemptObject = value;
    const xpBase = evaluateFormula(logicTest.baseRewardFormula, logicTest);
    // multiplicador segun ratio
    let ratio = value.timeUsed / logicTest.timeLimit;

    if (ratio <= 0.5) {
      ratio = 1.5;
    }

    if (ratio < ratio && ratio <= 0.8) {
      ratio = 1.2;
    }

    if (ratio < 0.8 && ratio <= 1) {
      ratio = 1;
    }

    const xpFinal = Math.floor(xpBase * ratio);

    let penaltyTotal;
    // penalizar
    if (ratio < 0.8) {
      const extraPenalty = difficulty * 2;
      penaltyTotal =
        evaluateFormula(logicTest.penaltyFormula, logicTest) + extraPenalty;
    } else {
      penaltyTotal = evaluateFormula(logicTest.penaltyFormula, logicTest);
    }

    logicTestAttemptObject.status = "success";

    // fallo
    if (bot.battery < penaltyTotal || bot.memory < logicTest.difficulty * 10) {
      // bajar bateria, el doc dice que baja pero no cuanto
      bot.battery -= 10;
      // no xp

      // rgistrar failed
      logicTestAttemptObject.status = "failed";
    }

    if (logicTestAttemptObject.status === "success") {
      bot.xp += xpFinal;
      levelUp(bot);
    }

    // guardar cambios en bot
    await botsServices.updateBot(value.botId, bot);

    const logicTestAttempt = await logicTestsRepository.attemptLogicTest(
      id,
      logicTestAttemptObject
    );
    return logicTestAttempt;
  },

  getById: async function getById(logicTestId) {
    const track = await logicTestsRepository.getById(logicTestId);
    return track;
  },
  createLogicTest: async function createLogicTest(data) {
    const { value, error } = createLogicTestSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const logicTest = await logicTestsRepository.create(value);
    return logicTest;
  },
};
