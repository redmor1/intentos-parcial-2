const Joi = require("joi");
const crypto = require("crypto");
const battlesRepository = require("../repositories/battlesRepository");

const battlesServices = {
  getAll: async function getAll() {
    const battles = await battlesRepository.getAll();
    return battles;
  },
  beginDuel: async function beginDuel(data) {
    const { value, error } = createBattleSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const battle = await battlesRepository.create(value);
    return battle;
  },
};

module.exports = battlesServices;
