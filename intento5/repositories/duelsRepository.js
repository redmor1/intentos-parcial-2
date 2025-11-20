import { readDB, writeDB } from "../utils/database.js";

export const duelsRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    fileJson.duels.push(data);

    await writeDB(fileJson);
    return data;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    const duels = fileJson.duels;
    const duel = duels.find((d) => d.id === id);
    if (!duels) {
      throw new Error(`No se encontro el duels con el id ${id}`);
    }

    return logicTest;
  },
  getAll: async function getAll(filters) {
    const fileJson = await readDB();
    let duels = fileJson.duels;

    return duels;
  },
};
