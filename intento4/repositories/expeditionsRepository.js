import { readDB, writeDB } from "../utils/database.js";

export const expeditionRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    const expeditions = fileJson.expeditions;
    expeditions.push(data);

    await writeDB(fileJson);
    return data;
  },
  put: async function put(id, data) {
    const fileJson = await readDB();
    let expeditions = fileJson.expeditions;
    let expedition;
    // encontrar el id y lo que voy a editar

    await writeDB(fileJson);
    return expedition;
  },
  createExpeditionAttempt: async function createExpeditionAttempt(data) {
    const fileJson = await readDB();
    const expeditionAttempt = fileJson.expeditionAttempts;
    expeditionAttempt.push(data);

    await writeDB(fileJson);
    return data;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    let expeditions = fileJson.expeditions;
    let expedition = expeditions.find((e) => e.id === id);

    if (!expedition) {
      throw new Error(`No se ha encontrado el expedition con la id ${id}`);
    }
    return expedition;
  },
};
