import Joi from "joi";
import crypto from "crypto";
import { formulasRepository } from "../repositories/formulasRepository.js";
import { alchemistsServices } from "./alchemistsServices.js";
import { evaluateFormulas, levelUp } from "../utils/formulas.js";

const createFormulaSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 1000000))
    .forbidden(),
  name: Joi.string().min(3).max(100).required(),
  toxicity: Joi.number().integer().min(1).default(1).max(10).required(),
  impactFormula: Joi.string().min(3).required(),
  manaCost: Joi.number().min(1).required(),
  requiredElement: Joi.string().min(3).required(),
});

export const formulasServices = {
  createFormula: async function createFormula(data) {
    const { value, error } = createFormulaSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const formula = await formulasRepository.create(value);
    return formula;
  },
  executeFormula: async function executeFormula(formulaId, alchemistId) {
    const formula = await formulasRepository.getById(formulaId);
    const alchemist = await alchemistsServices.getById(alchemistId);

    // validar mana
    if (alchemist.mana < formula.manaCost) {
      throw new Error("El alchemist no tiene suficiente mana");
    }
    console.log(alchemist);
    // validar conocimiento
    if (!alchemist.knownElements.includes(formula.requiredElement)) {
      throw new Error("El alchemist no tiene el conocimiento requerido");
    }

    // consumo
    alchemist.mana -= formula.manaCost;

    // evaluar formula
    const reward = evaluateFormulas(formula.impactFormula, formula);

    const experimentObject = {
      alchemistId: alchemist.id,
    };

    if (formula.toxicity > alchemist.rank) {
      // penalizacion
      const damage = formula.toxicity * 5;
      alchemist.mana = Math.max(0, alchemist.mana - damage);
      experimentObject.status = "failed";
    } else {
      // level up
      levelUp(alchemist);
      experimentObject.status = "success";
    }
    const experiment = await formulasRepository.createExperiment(
      experimentObject
    );

    return experiment;
  },
};
