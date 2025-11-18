const netrunnersServices = require("../services/netrunnersServices");

const netrunnersControllers = {
  getAll: async function getAll(req, res, next) {
    let filters = req.query;
    if (filters.minReputation) {
      filters.minReputation = Number(filters.minReputation);
    }
    if (filters.hasProgram) {
      filters.hasProgram = String(filters.hasProgram);
    }

    const netrunners = await netrunnersServices.getAll(filters);
    return res.status(200).json({ netrunners: netrunners });
  },

  createNetrunner: async function createNetrunner(req, res, next) {
    const data = req.body;
    const netrunner = await netrunnersServices.createNetrunner(data);
    return res.status(200).json(netrunner);
  },

  updateNetrunnerHardware: async function updateNetrunnerHardware(
    req,
    res,
    next
  ) {
    const id = Number(req.params.id);
    console.log(id);
    const data = req.body;
    const netrunner = await netrunnersServices.updateNetrunnerHardware(
      data,
      id
    );
    return res.status(200).json({ netrunner });
  },

  updateNetrunnerRam: async function updateNetrunnerRam(req, res, next) {},
};

module.exports = netrunnersControllers;
