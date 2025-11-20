import Joi from "joi";
import crypto from "crypto";
import { expeditionRepository } from "../repositories/expeditionsRepository.js";
import { colonistsServices } from "./colonistsServices.js";
import { evaluateFormula, levelUp } from "../utils/formulas.js";

const createExpeditionSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 100000000)),
  codeName: Joi.string().min(3).max(100).required(),
  difficulty: Joi.number().integer().min(1).max(100).required(),
  oxygenCost: Joi.number().integer().min(1).required(),
  creditReward: Joi.number().integer().min(1).required(),
  riskFactor: Joi.string().min(3).required(),
});

const executeExpeditionSchema = Joi.object().keys({
  colonistId: Joi.number().integer().min(1).required(),
});

export const expeditionsServices = {
  createExpedition: async function createExpedition(data) {
    const { error, value } = createExpeditionSchema.validate(data);

    if (error) {
      throw new Error(error.details[0].message);
    }
    const expedition = await expeditionRepository.create(value);
    return expedition;
  },
  executeExpedition: async function executeExpedition(
    expeditionId,
    colonistId
  ) {
    const { error, value } = executeExpeditionSchema.validate({ colonistId });

    if (error) {
      throw new Error(error.details[0].message);
    }
    // get colonist
    let colonist = await colonistsServices.getById(colonistId);
    const expedition = await expeditionsServices.getById(expeditionId);

    if (colonist.status === "INJURED" || colonist.status === "CRITICAL") {
      throw new Error("El colonist esta dañado y no puede salir", {
        status: 409,
      });
    }

    if (colonist.oxygen < expedition.oxygenCost) {
      throw new Error("El colonist no tiene el suficiente oxigeno");
    }

    // descontar oxygen
    colonist.oxygen -= expedition.oxygenCost;

    // calculo riesgo
    const riskFactor = evaluateFormula(
      expedition.riskFactor,
      expedition,
      colonist
    );

    // exito
    if (riskFactor < 10) {
      colonist.credits += expedition.creditReward;
      colonist.xp += expedition.difficulty * 1.5;
      colonist.oxygen += 10;
      levelUp(colonist);
    } else if (riskFactor > 10 && riskFactor < 40) {
      colonist.credits += expedition.creditReward / 2;
      colonist.xp += expedition.difficulty;
      colonist.stats.strength -= 5;
      levelUp(colonist);
    } else if (riskFactor > 40) {
      colonist.status = "INJURED";
      colonist.xp -= 20;
    }

    await colonistsServices.modifyColonist(colonistId, colonist);

    const expeditionAttempt =
      await expeditionRepository.createExpeditionAttempt(expeditionId);
    return expeditionAttempt;
  },
  getById: async function getById(id) {
    const expedition = await expeditionRepository.getById(id);
    return expedition;
  },
};
