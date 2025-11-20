import express from "express";
import { botsController } from "../controllers/botsController.js";

export const botsRoutes = express.Router();

botsRoutes.get("/bots", botsController.getAll);

botsRoutes.post("/bots", botsController.createBot);

botsRoutes.patch("/bots/:id/modules", botsController.patchBot);
