import express from "express";
import { expeditionsController } from "../controllers/expeditionsController.js";

export const expeditionsRoutes = express.Router();

expeditionsRoutes.post("/expeditions", expeditionsController.createExpedition);

expeditionsRoutes.post(
  "/expeditions/:expeditionId/start",
  expeditionsController.executeExpedition
);
