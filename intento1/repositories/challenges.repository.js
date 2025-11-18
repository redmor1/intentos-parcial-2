const fs = require("fs");

const challengeRepository = {
  get: async function get(filters) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      let challenges = fileJson.challenges;

      // filtrar por title
      if (filters.title) {
        challenges = challenges.filter((c) =>
          c.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }

      // filtrar por difficulty
      if (filters.minDifficulty && filters.maxDifficulty) {
        challenges = challenges.filter(
          (c) =>
            c.difficulty >= filters.minDifficulty &&
            c.difficulty <= maxDifficulty
        );
      }
      return challenges;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  create: async function create(data) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);

      fileJson.challenges.push(data);

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
  getById: async function getById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      const challenges = fileJson.challenges;
      let challenge = challenges.find((c) => c.id === id);
      if (!challenge) {
        throw Error(`Challenge con ID ${id} no encontrado`);
      }
      return challenge;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  createChallengeAttempt: async function createChallengeAttempt(data) {
    try {
      const fileData = await fs.promises.readFile(
        "./database/game.json",
        "utf-8"
      );
      const fileJson = JSON.parse(fileData);
      const challengesAttempts = fileJson.challengesAttempts;
      challengesAttempts.push(data);
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

module.exports = challengeRepository;
