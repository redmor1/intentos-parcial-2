const Joi = require("joi");
const duelsRepository = require("../repositories/duels.repository");
const guardiansService = require("./guardians.service");
const {
  calculateWinnerDuelFormula,
  calculateExp,
} = require("../utils/formulas");
const { levelUp } = require("./challenges.service");

// {
//   "id": 3,
//   "guardian1": 1,
//   "guardian2": 4,
//   "winner": 1,
//   "power1": 134,
//   "power2": 120,
//   "timestamp": "2025-11-13T14:00:00.000Z"
// }

const createDuelSchemaResponse = Joi.object().keys({
  id: Joi.number().integer().min(1).required(),
  guardian1: Joi.number().integer().min(1).required(),
  guardian2: Joi.number().integer().min(1).required(),
  winner: Joi.number().integer().min(1).required(),
  power1: Joi.number().integer().min(1).required(),
  power2: Joi.number().integer().min(1).required(),
  timeStamp: Joi.date().timestamp(),
});

const createDuelSchema = Joi.object().keys({
  guardian1: Joi.number().integer().min(0).required(),
  guardian2: Joi.number().integer().min(0).required(),
});

const duelsService = {
  createDuel: async function createDuel(data) {
    try {
      const { error } = createDuelSchema.validate(data);
      if (error) {
        throw new Error(error.details[0].message);
      }
      const guardian1 = await guardiansService.getById(data.guardian1);
      const guardian2 = await guardiansService.getById(data.guardian2);
      const duelObject = calculateWinnerDuelFormula(guardian1, guardian2);
      const duel = await duelsRepository.createDuel(duelObject);
      // both lose 10 energy points
      await guardiansService.updateGuardianEnergy(
        {
          energy: guardian1.energy - 10,
        },
        guardian1.id
      );
      await guardiansService.updateGuardianEnergy(
        {
          energy: guardian2.energy - 10,
        },
        guardian2.id
      );

      if (duel.winner == guardian1.id) {
        const rewardExp = calculateExp(duel.power1, duel.power2);
        guardian1.xp += rewardExp;
        levelUp(guardian1);
        await guardiansService.updateGuardian(guardian1, guardian1.id);
      }

      if (duel.winner == guardian2.id) {
        const rewardExp = calculateExp(duel.power2, duel.power1);
        guardian2.xp += rewardExp;
        levelUp(guardian2);
        await guardiansService.updateGuardian(guardian2, guardian2.id);
      }

      return duel;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getDuels: async function getDuels(filters) {
    try {
      const duels = await duelsRepository.getDuels(filters);
      return duels;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

module.exports = duelsService;
