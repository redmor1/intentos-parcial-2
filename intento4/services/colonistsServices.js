import Joi from "joi";
import crypto from "crypto";
import { colonistRepository } from "../repositories/colonistsRepository.js";

const createColonistSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 100000000)),
  name: Joi.string().min(3).max(100).required(),
  rank: Joi.string()
    .valid("Rookie", "Specialist", "Commander")
    .default("Rookie"),
  xp: Joi.number().integer().min(0).default(0),
  oxygen: Joi.number().integer().min(0).max(100).default(100),
  credits: Joi.number().integer().min(0).default(50),
  status: Joi.string().valid("ACTIVE", "INJURED", "CRITICAL").default("ACTIVE"),
  stats: Joi.object()
    .keys({
      strength: Joi.number().integer().default(1),
      intelligence: Joi.number().integer().required().default(1),
      adaptability: Joi.number().integer().required().default(1),
    })
    .default({
      strength: 1,
      intelligence: 1,
      adaptability: 1,
    }),
});

export const colonistsServices = {
  getAll: async function getAll(filters) {
    const colonists = await colonistRepository.getAll(filters);
    return colonists;
  },
  getById: async function getById(id) {
    const colonist = await colonistRepository.getById(id);
    return colonist;
  },
  createColonist: async function createColonist(data) {
    const { error, value } = createColonistSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const colonist = await colonistRepository.create(value);
    return colonist;
  },
  modifyColonist: async function modifyColonist(id, data) {
    const colonist = await colonistRepository.put(id, data);
    return colonist;
  },
  healColonist: async function healColonist(params) {},
};
