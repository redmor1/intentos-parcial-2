import { readDB, writeDB } from "../utils/database.js";

export const botsRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    fileJson.bots.push(data);

    await writeDB(fileJson);
    return data;
  },
  getAll: async function getAll(filters) {
    const fileJson = await readDB();
    let bots = fileJson.bots;

    return bots;
  },
  patchModules: async function patchModules(id, data) {
    const fileJson = await readDB();
    let bots = fileJson.bots;
    const botIndex = bots.findIndex((b) => b.id === id);

    if (botIndex === -1) {
      throw new Error(`El bot con id ${id} no existe`);
    }

    bots[botIndex].modules = [...bots[botIndex].modules, ...data.modules];

    await writeDB(fileJson);
    return bots[botIndex];
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    const bots = fileJson.bots;
    const bot = bots.find((t) => t.id === id);
    if (!bot) {
      throw new Error(`No se encontro el bot con el id ${id}`);
    }

    return bot;
  },
  updateBot: async function updateBot(id, data) {
    const fileJson = await readDB();
    let bots = fileJson.bots;
    const botIndex = bots.findIndex((b) => b.id === id);

    if (botIndex === -1) {
      throw new Error(`El bot con id ${id} no existe`);
    }

    bots[botIndex] = {
      ...bots[botIndex],
      ...data,
    };

    await writeDB(fileJson);
    return bots[botIndex];
  },
};
