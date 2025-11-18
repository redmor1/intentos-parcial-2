const fs = require("fs");

const guardiansRepository = {
  create: async function create(data) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      fileJson.guardians.push(data);
      await fs.promises.writeFile(
        "./database/game.json",
        JSON.stringify(fileJson),
        "utf-8"
      );
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  get: async function get(filters) {
    try {
      const data = await fs.promises.readFile("./database/game.json", "utf-8");
      let guardians = JSON.parse(data).guardians;
      if (filters.skill) {
        guardians = guardians.filter((g) => g.skills.includes(filters.skill));
      }
      if (filters.name) {
        guardians = guardians.filter((g) =>
          g.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.levelRangeStart && filters.levelRangeEnd) {
        guardians = guardians.filter(
          (g) =>
            g.level >= filters.levelRangeStart &&
            g.level <= filters.levelRangeEnd
        );
      }
      return guardians;
    } catch (e) {
      console.error(e);
    }
  },
  getById: async function getById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      const guardians = fileJson.guardians;
      let guardian = guardians.find((g) => g.id === id);

      if (!guardian) {
        throw Error(`Guardian con ID ${id} no encontrado`);
      }
      return guardian;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  updateEnergy: async function updateEnergy(data, id) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      let guardian = fileJson.guardians.find((g) => g.id === id);
      if (!guardian) {
        throw new Error(`Guardian con ID: ${id} no encontrado`);
      }
      guardian.energy = data.energy;

      await fs.promises.writeFile(
        "./database/game.json",
        JSON.stringify(fileJson),
        "utf-8"
      );
      return guardian;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  updateItems: async function updateItems(data, id) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);

      // encontrar guardian
      const guardian = fileJson.guardians.find((g) => {
        return g.id === id;
      });

      if (!guardian) {
        throw new Error(`Guardian no encontrado con id ${id}`);
      }

      if (data.action.toLowerCase() === "add") {
        data.items.forEach((i) => guardian.items.push(i));
        await fs.promises.writeFile(
          "./database/game.json",
          JSON.stringify(fileJson),
          "utf-8"
        );
        return guardian;
      }

      if (data.action.toLowerCase() === "delete") {
        guardian.items = guardian.items.filter((existingItem) => {
          const shouldDelete = data.items.some(
            (itemToDelete) =>
              itemToDelete.name === existingItem.name &&
              itemToDelete.power === existingItem.power
          );

          return !shouldDelete;
        });

        await fs.promises.writeFile(
          "./database/game.json",
          JSON.stringify(fileJson),
          "utf-8"
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  updateGuardian: async function updateGuardian(guardianData, id) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      let guardians = fileJson.guardians;

      // encontrar guardian
      let guardian = guardians.find((g) => {
        return g.id === id;
      });

      if (!guardian) {
        throw new Error(`Guardian no encontrado con id ${id}`);
      }

      Object.assign(guardian, guardianData);

      await fs.promises.writeFile(
        "./database/game.json",
        JSON.stringify(fileJson),
        "utf-8"
      );
      return guardian;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

module.exports = guardiansRepository;
