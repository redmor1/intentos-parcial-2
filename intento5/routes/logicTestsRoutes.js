import express from "express";
import { logicTestsController } from "../controllers/logicTestsController.js";

export const logicTestsRoutes = express.Router();

logicTestsRoutes.post("/logic-tests", logicTestsController.createLogicTest);

logicTestsRoutes.post(
  "/logic-tests/:logicTestId/attempt",
  logicTestsController.attemptLogicTest
);
