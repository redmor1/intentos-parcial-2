import { readDB, writeDB } from "../utils/database.js";

export const alchemistsRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    const alchemists = fileJson.alchemists;
    alchemists.push(data);
    await writeDB(fileJson);
    return data;
  },
  get: async function get(filters) {
    const fileJson = await readDB();
    let alchemists = fileJson.alchemists;

    // filtro minRank
    if (filters.minRank) {
      alchemists = alchemists.filter((a) => a.rank >= filters.minRank);
    }

    return alchemists;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    let alchemists = fileJson.alchemists;
    let alchemist = alchemists.find((a) => a.id === id);
    if (!alchemist) {
      throw new Error(`No se encontro una alchemist con id ${id}`);
    }
    return alchemist;
  },
  modifyAlchemis: async function modifyAlchemist(id, mana) {
    const fileJson = await readDB();
    let alchemists = fileJson.alchemists;
    let alchemist = alchemists.find((a) => a.id === id);
    if (!alchemist) {
      throw new Error(`No se encontro una alchemist con id ${id}`);
    }
    alchemist.mana = mana;
    await writeDB(fileJson);
    return alchemist;
  },
};
