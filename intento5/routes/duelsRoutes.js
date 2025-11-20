import express from "express";
import { duelsController } from "../controllers/duelsController.js";

export const duelsRoutes = express.Router();

duelsRoutes.get("/duels", duelsController.getAll);

duelsRoutes.post("/duels", duelsController.createDuel);
