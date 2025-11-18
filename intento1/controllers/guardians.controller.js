const guardiansService = require("../services/guardians.service");
const { calculateRewardFormula } = require("../utils/formulas");

const guardiansController = {
  createGuardian: async function createGuardian(req, res, next) {
    const data = req.body;
    try {
      const guardian = await guardiansService.createGuardian(data);
      return res.status(200).json({ guardian });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  },
  getGuardians: async function getGuardians(req, res, next) {
    const filters = req.query;
    console.log(filters);
    try {
      const guardians = await guardiansService.getGuardians(filters);
      return res.status(200).json({ guardians });
    } catch (e) {
      console.error(e);
    }
  },
  updateGuardianEnergy: async function updateGuardianEnergy(req, res, next) {
    const data = req.body;
    const id = Number(req.params.id);
    try {
      const guardianUpdated = await guardiansService.updateGuardianEnergy(
        data,
        id
      );
      return res.status(200).json({ guardian: guardianUpdated });
    } catch (e) {
      console.error(e);
    }
  },
  updateGuardianItems: async function updateGuardianItems(req, res, next) {
    const data = req.body;
    const id = Number(req.params.id);
    try {
      const guardianUpdated = await guardiansService.updateGuardianItems(
        data,
        id
      );

      return res.status(200).json({ guardian: guardianUpdated });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = guardiansController;
