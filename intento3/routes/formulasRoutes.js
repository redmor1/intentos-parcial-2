import express from "express";
import formulasControllers from "../controllers/formulasControllers.js";

export const formulasRoutes = express.Router();

formulasRoutes.post("/formulas", formulasControllers.createFormula);
formulasRoutes.post(
  "/formulas/:formulaId/experiment/:alchemistId",
  formulasControllers.executeFormula
);
