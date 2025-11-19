import { formulasServices } from "../services/formulasServices.js";

export const formulasControllers = {
  createFormula: async function createFormula(req, res, next) {
    const data = req.body;
    const formula = await formulasServices.createFormula(data);
    return res.status(200).json({ formula });
  },
  executeFormula: async function executeFormula(req, res, next) {
    const params = req.params;
    if (!params.formulaId) {
      throw new Error("Falta el formulaId en el params");
    }
    if (!params.alchemistId) {
      throw new Error("Falta el alchemistId en el params");
    }
    params.formulaId = Number(params.formulaId);
    params.alchemistId = Number(params.alchemistId);

    const formula = await formulasServices.executeFormula(
      params.formulaId,
      params.alchemistId
    );
    return res.status(200).json({ formula });
  },
};

export default formulasControllers;
