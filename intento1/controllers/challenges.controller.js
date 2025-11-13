const challengesService = require("../services/challenges.service");

const challengesController = {
  getChallenges: async function getChallenges(req, res, next) {
    try {
      const challenges = await challengesService.getChallenges(filters);
      return res.status(200).json({ challenges });
    } catch (e) {
      console.error(e);
    }
  },
  createChallenge: async function createChallenge(req, res, next) {
    try {
      const challenge = await challengesService.createChallenge(data);
      return res.status(200).json({ challenge });
    } catch (e) {
      console.error(e);
    }
  },
  createChallengeAttempt: async function createChallengeAttempt(
    req,
    res,
    next
  ) {
    try {
      const challengeAttempt = await challengesService.createChallengeAttempt(
        data
      );
      return res.status(200).json({ challenge: challengeAttempt });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = challengesController;
