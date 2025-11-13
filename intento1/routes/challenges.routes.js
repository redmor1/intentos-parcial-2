const { Router } = require("express");
const challengesController = require("../controllers/challenges.controller");

const challengesRouter = Router();

// Agregar filtros
challengesRouter.get("/challenges", challengesController.getChallenges);

challengesRouter.post("/challenges", challengesController.createChallenge);

challengesRouter.post(
  "/challenges/:challengeId/attempt/:guardianId",
  challengesController.createChallengeAttempt
);

module.exports = challengesRouter;
