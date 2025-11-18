const fs = require("fs");

const duelsRepository = {
  getDuels: async function getDuels(filters) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      let duels = fileJson.duels;

      // filtrar por winner
      if (filters.winner) {
        duels = duels.filter((d) => d.winner === filters.winner);
      }

      // filtrar por date
      // TODO: no se como
      //   if (filters.date) {
      //     duels = duels.filter((d) =>
      //     );
      //   }

      // filtrar por diferencia minima de poder
      if (filters.minPowerDifference) {
        duels = duels.filter(
          (d) =>
            Math.abs(d.power1) - Math.abs(d.power2) < filters.minPowerDifference
        );
      }

      return duels;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  createDuel: async function createDuel(data) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);

      fileJson.duels.push(data);

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
};

module.exports = duelsRepository;
