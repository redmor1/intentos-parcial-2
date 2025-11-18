const Joi = require("joi");
const crypto = require("crypto");
const netrunnersRepository = require("../repositories/netrunnersRepository");

const createNetrunnerSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .default(() => crypto.randomInt(1, 1000000)) // generar id random
    .forbidden(),
  alias: Joi.string().min(3).required(),
  reputation: Joi.number().integer().default(1).forbidden(),
  data: Joi.number().integer().default(0).forbidden(),
  ram: Joi.number().integer().default(128).forbidden(),
  programs: Joi.array().items(Joi.string()).default([]),
  hardware: Joi.array()
    .items(
      Joi.object().keys({
        model: Joi.string().min(3).required(),
        clockSpeed: Joi.number().integer().min(1).required(),
      })
    )
    .default([]),
});

const addHardwareSchema = Joi.object().keys({
  hardware: Joi.object()
    .keys({
      model: Joi.string().min(3).required(),
      clockSpeed: Joi.number().integer().min(1).required(),
    })
    .required(),
});

const netrunnersServices = {
  getAll: async function getAll(filters) {
    const netrunners = await netrunnersRepository.getAll(filters);
    return netrunners;
  },
  createNetrunner: async function createNetrunner(data) {
    const { value, error } = createNetrunnerSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const netrunner = await netrunnersRepository.create(value);
    return netrunner;
  },
  updateNetrunnerHardware: async function updateNetrunnerHardware(data, id) {
    const { value, error } = addHardwareSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const netrunner = await netrunnersRepository.updateNetrunnerHardware(
      value,
      id
    );

    return netrunner;
  },
  updateNetrunnerRam: async function updateNetrunnerRam(id, ram) {
    const netrunner = await netrunnersRepository.updateNetrunnerRam(id, ram);
    return netrunner;
  },
  getById: async function getById(id) {
    const netrunner = await netrunnersRepository.getById(id);
    return netrunner;
  },
};

module.exports = netrunnersServices;
