const Joi = require("joi");
const crypto = require("crypto");
const serversRepository = require("../repositories/serversRepository");
const netrunnersServices = require("./netrunnersServices");
const { calculateDataYieldFormula, levelUp } = require("../utils/formulas");

const createServerSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .default(() => crypto.randomInt(1, 1000000)) // generar id random
    .forbidden(),
  hostname: Joi.string().min(3).required(),
  firewallDensity: Joi.number().integer().min(1).max(100).required(),
  ramCost: Joi.number().integer().min(1).required(),
  dataYieldFormula: Joi.string().min(1).required(),
  requiredProgram: Joi.string().min(1).required(),
});

const serversServices = {
  getAll: async function getAll() {
    const servers = await serversRepository.getAll();
    return servers;
  },
  createServer: async function createServer(data) {
    const { value, error } = createServerSchema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const server = await serversRepository.create(value);
    return server;
  },
  attemptServerHack: async function attemptServerHack(serverId, netrunnerId) {
    const netrunner = await netrunnersServices.getById(netrunnerId);
    const server = await serversRepository.getById(serverId);
    console.log(netrunner);
    // valida ram
    if (netrunner.ram < server.ramCost) {
      throw new Error(
        "El netrunner no tiene suficiente ram para intentar el hack"
      );
    }
    // validar requiredProgram
    if (!netrunner.programs.includes(server.requiredProgram)) {
      throw new Error("El netrunner no tiene el requiredProgram");
    }

    // descontar ram
    netrunner.ram -= server.ramCost;

    // calcular la recompensa
    const reward = calculateDataYieldFormula(server.dataYieldFormula, server);

    let attemptObject = {
      attemptId: crypto.randomInt(1, 10000),
      netrunnerId: netrunner.id,
    };
    // condicion fallo
    if (server.firewallDensity > netrunner.reputation * 10) {
      attemptObject.status = "intercepted";

      const damage = server.firewallDensity * 0.5;
      netrunner.ram -= damage;
      // guardar netrunner
    } else {
      // condicion exito
      attemptObject.status = "breached";
      // subir reputacion
      netrunner.data += reward;
      levelUp(netrunner);
    }
    let savedNetrunner = await netrunnersServices.updateNetrunnerRam(
      netrunner.id,
      netrunner.ram
    );
    const attempt = await serversRepository.createServerHackAttempt(
      attemptObject
    );
    return { savedNetrunner, attempt };
  },
  getById: async function getById(id) {
    const server = await serversRepository.getById(id);
    return server;
  },
};

module.exports = serversServices;
