const { readDB, writeDB } = require("../utils/database");

const netrunnersRepository = {
  getAll: async function getAll(filters) {
    const fileJson = await readDB();
    let netrunners = fileJson.netrunners;

    // filtro minReputation
    if (filters.minReputation) {
      netrunners = netrunners.filter(
        (n) => n.reputation >= filters.minReputation
      );
    }
    // filtro hasProgram
    if (filters.hasProgram) {
      netrunners = netrunners.filter((n) =>
        n.programs.includes(filters.hasProgram)
      );
    }
    return netrunners;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    const netrunners = fileJson.netrunners;

    let netrunner = netrunners.find((n) => n.id === id);

    if (!netrunner) {
      throw new Error("No se encontro un netrunner con id:", id);
    }

    return netrunner;
  },
  create: async function create(data) {
    const fileJson = await readDB();
    const netrunners = fileJson.netrunners;
    netrunners.push(data);
    await writeDB(fileJson);
    return data;
  },
  updateNetrunnerHardware: async function updateNetrunnerHardware(
    hardwareData,
    id
  ) {
    const fileJson = await readDB();

    const netrunners = fileJson.netrunners;

    let netrunner = netrunners.find((n) => n.id === id);

    if (!netrunner) {
      throw new Error(`No se encontro un netrunner con id: ${id}`);
    }

    netrunner.hardware.push(hardwareData.hardware);
    await writeDB(fileJson);

    return netrunner;
  },
  updateNetrunnerRam: async function updateNetrunnerRam(id, ram) {
    const fileJson = await readDB();

    const netrunners = fileJson.netrunners;

    let netrunner = netrunners.find((n) => n.id === id);

    if (!netrunner) {
      throw new Error(`No se encontro un netrunner con id: ${id}`);
    }

    netrunner.ram = ram;
    await writeDB(fileJson);

    return netrunner;
  },
};

module.exports = netrunnersRepository;
