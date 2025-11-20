import { readDB, writeDB } from "../utils/database.js";

export const colonistRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    const colonists = fileJson.colonists;
    colonists.push(data);

    await writeDB(fileJson);
    return data;
  },
  getAll: async function getAll(filters) {
    const fileJson = await readDB();
    let colonists = fileJson.colonists;
    // hacer filtros
    if (filters.status) {
      colonists = colonists.filter((c) => c.status === filters.status);
    }

    if (filters.minIntelligence) {
      colonists = colonists.filter(
        (c) => c.stats.intelligence >= filters.minIntelligence
      );
    }
    return colonists;
  },
  put: async function put(id, data) {
    const fileJson = await readDB();
    let colonists = fileJson.colonists;
    let colonist = await this.getById(id);
    // encontrar el id y lo que voy a editar

    if (colonist) {
      colonist = { ...colonist, ...data };
    }

    await writeDB(fileJson);
    return colonist;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    let colonists = fileJson.colonists;
    let colonist = colonists.find((c) => c.id === id);

    if (!colonist) {
      throw new Error(`No se ha encontrado el colonist con la id ${id}`);
    }

    return colonist;
  },
};
