const guardiansRepository = require("../repositories/guardians.repository");
const Joi = require("joi");

const createGuardianSchema = Joi.object().keys({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().min(3).max(60).required(),
  level: Joi.number().integer().default(1).min(0),
  xp: Joi.number()
    .integer()
    .default(0)
    .min(0)
    .max(Joi.ref("level", { adjust: (level) => level * 75 })),
  energy: Joi.number().integer().default(100),
  skills: Joi.array().items(Joi.string()).unique().default([]),
  items: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().min(3).max(60).required(),
        power: Joi.number().integer().required(),
      })
    )
    .default([]),
});

const modifyGuardianEnergySchema = Joi.object().keys({
  energy: Joi.number().integer().required(),
});

const modifyGuardianItemsSchema = Joi.object().keys({
  items: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().min(3).max(60).required(),
        power: Joi.number().integer().required(),
      })
    )
    .required(),
});

const guardiansService = {
  createGuardian: async function createGuardian(data) {
    const { value, error } = createGuardianSchema.validate(data);
    try {
      if (error) {
        throw new Error(error.details[0].message);
      }
      //   const guardianExists = await guardiansRepository.getById(value.id);
      //   // checkear si ya existe el id
      //   if (guardianExists) {
      //     throw Error(`Ya existe un Guardian con este ID ${value.id}`);
      //   }
      const guardian = await guardiansRepository.create(value);
      return guardian;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getGuardians: async function getGuardians(filters) {
    try {
      const guardians = await guardiansRepository.get(filters);
      return guardians;
    } catch (e) {
      console.error(e);
    }
  },
  updateGuardianEnergy: async function updateGuardianEnergy(data, id) {
    try {
      const { error } = modifyGuardianEnergySchema.validate(data);
      if (error) {
        throw new Error(error.details[0].message);
      }
      const guardian = await guardiansRepository.updateEnergy(data, id);
      return guardian;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  updateGuardianItems: async function updateGuardianItems(data, id) {
    try {
      const { error } = modifyGuardianItemsSchema.validate(data);
      const guardian = await guardiansRepository.updateItems(data, id);
      return guardian;
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = guardiansService;
