const Joi = require("joi");
const challengeRepository = require("../repositories/challenges.repository");
const guardiansService = require("./guardians.service");
const { calculateRewardFormula } = require("../utils/formulas");

const createChallengeSchema = Joi.object().keys({
  id: Joi.number().integer().required().min(0).required(),
  title: Joi.string().min(3).max(100).required(),
  difficulty: Joi.number().integer().min(1).max(10).required(),
  energyCost: Joi.number().integer().min(1).required(),
  rewardFormula: Joi.string().required(),
  requiredSkill: Joi.string().required(),
});

// logica matematica
function levelUp(guardian) {
  let requiredXp = guardian.level * 75;

  while (guardian.xp >= requiredXp) {
    guardian.level += 1;
    guardian.xp = guardian.xp - requiredXp;
    requiredXp = guardian.level * 75;
  }
}

const challengesService = {
  createChallenge: async function createChallenge(data) {
    try {
      const challenge = await challengeRepository.create(data);
      return challenge;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getChallenges: async function getChallenges(filters) {
    try {
      const challenge = await challengeRepository.get(filters);
      return challenge;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getById: async function getById(id) {
    try {
      const challenge = await challengeRepository.getById(id);
      return challenge;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  createChallengeAttempt: async function createChallengeAttempt(params) {
    try {
      let guardian = await guardiansService.getById(params.guardianId);
      const challenge = await challengesService.getById(params.challengeId);
      // checkear que tenga la skill requerida
      if (!guardian.skills.includes(challenge.requiredSkill)) {
        throw new Error("El Guardian no contiene la skill requerida");
      }

      // descontar energia
      if (guardian.energy < challenge.energyCost) {
        throw new Error("El Guardian no tiene la energia requerida");
      }
      guardiansService.updateGuardianEnergy(
        { energy: guardian.energy - challenge.energyCost },
        Number(guardian.id)
      );

      // calcular experiencia
      const expRewarded = calculateRewardFormula(
        challenge.difficulty,
        challenge.energyCost,
        challenge.rewardFormula
      );

      // fail
      if (challenge.difficulty > guardian.level * 2) {
        // pierde energia adicional
        let penalty = challenge.difficulty * 3;
        guardian = await guardiansService.getById(guardian.id);
        guardiansService.updateGuardianEnergy(
          { energy: guardian.energy - penalty },
          Number(guardian.id)
        );

        challengeRepository.createChallengeAttempt({
          guardianId: guardian.id,
          status: "failed",
        });
        guardiansService.updateGuardian(guardian, guardian.id);
      } else {
        // win
        guardian.xp += expRewarded;
        levelUp(guardian);
        challengeRepository.createChallengeAttempt({
          guardianId: guardian.id,
          status: "success",
        });
        guardiansService.updateGuardian(guardian, guardian.id);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

module.exports = { challengesService, levelUp };
