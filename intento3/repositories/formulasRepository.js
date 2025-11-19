import { readDB, writeDB } from "../utils/database.js";

export const formulasRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    const formulas = fileJson.formulas;
    formulas.push(data);
    await writeDB(fileJson);
    return data;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    let formulas = fileJson.formulas;
    let formula = formulas.find((f) => f.id === id);
    if (!formula) {
      throw new Error(`No se encontro una formula con id ${id}`);
    }

    return formula;
  },
  createExperiment: async function createExperiment(experiment) {
    const fileJson = await readDB();
    const experiments = fileJson.experiments;
    experiments.push(experiment);
    await writeDB(fileJson);
    return experiment;
  },
};
