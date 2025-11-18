const { readDB, writeDB } = require("../utils/database");

const serversRepository = {
  getAll: async function getAll() {
    const fileJson = await readDB();
    let servers = fileJson.servers;
    return servers;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    const servers = fileJson.servers;

    let server = servers.find((s) => s.id === id);

    if (!server) {
      throw new Error("No se encontro un server con id:", id);
    }

    return server;
  },
  create: async function create(data) {
    const fileJson = await readDB();
    const servers = fileJson.servers;
    servers.push(data);
    await writeDB(fileJson);
    return data;
  },
  createServerHackAttempt: async function createServerHackAttempt(attempt) {
    const fileJson = await readDB();

    const serversHackAttempt = fileJson.serversHackAttempt;

    serversHackAttempt.push(attempt);

    await writeDB(fileJson);
    return attempt;
  },
};

module.exports = serversRepository;
