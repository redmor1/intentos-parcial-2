const challengesService = require("../services/challenges.service");

const challengesController = {
  getChallenges: async function getChallenges(req, res, next) {
    let filters = req.query;
    try {
      const challenges = await challengesService.getChallenges(filters);
      return res.status(200).json({ challenges });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  },
  createChallenge: async function createChallenge(req, res, next) {
    let data = req.body;
    try {
      const challenge = await challengesService.createChallenge(data);
      return res.status(200).json({ challenge });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  },
  createChallengeAttempt: async function createChallengeAttempt(
    req,
    res,
    next
  ) {
    let params = req.params;
    params.guardianId = Number(params.guardianId);
    params.challengeId = Number(params.challengeId);

    try {
      const challengeAttempt = await challengesService.createChallengeAttempt(
        params
      );
      return res.status(200).json({ challenge: challengeAttempt });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  },
};

module.exports = challengesController;
