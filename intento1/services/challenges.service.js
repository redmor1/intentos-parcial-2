const challengeRepository = require("../repositories/challenges.repository");

const challengesService = {
  createChallenge: async function createChallenge(data) {
    try {
      const challenge = await challengeRepository.create(data);
    } catch (e) {
      console.error(e);
    }
  },
  getChallenges: async function getChallenges(filters) {
    try {
      const challenge = await challengeRepository.get(filters);
    } catch (e) {
      console.error(e);
    }
  },
  createChallengeAttempt: async function createChallengeAttempt(data) {
    try {
      const challenge = await challengeRepository.createAttempt(data);
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = challengesService;
