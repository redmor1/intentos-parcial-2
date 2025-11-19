import Joi from "joi";
import crypto from "crypto";
import { alchemistsRepository } from "../repositories/alchemistsRepository.js";

const createAlchemistSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .default(() => crypto.randomInt(1, 1000000))
    .forbidden(),
  name: Joi.string().min(3).max(100).required(),
  rank: Joi.number().integer().min(1).default(1).forbidden(),
  wisdomPoints: Joi.number().integer().min(0).default(0).forbidden(),
  mana: Joi.number().integer().min(0).default(150).forbidden(),
  knownElements: Joi.array().items(Joi.string()).default([]),
  artifacts: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().min(3).max(100).required(),
        purity: Joi.number().integer().min(1).required(),
      })
    )
    .default([]),
});

export const alchemistsServices = {
  getAll: async function getAll(filters) {
    const alchemists = await alchemistsRepository.get(filters);
    return alchemists;
  },
  createAlchemist: async function createAlchemist(data) {
    const { value, error } = createAlchemistSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const alchemist = await alchemistsRepository.create(value);
    return alchemist;
  },
  getById: async function getById(id) {
    const alchemist = await alchemistsRepository.getById(id);
    return alchemist;
  },
  modifyAlchemistMana: async function modifyAlchemistMana(id, mana) {
    const alchemist = await alchemistsRepository.getById(id);
    return alchemist;
  },
};
