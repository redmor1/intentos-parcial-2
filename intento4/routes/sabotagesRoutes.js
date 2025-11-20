import express from "express";
import { sabotagesController } from "../controllers/sabotagesController.js";

export const sabotagesRoutes = express.Router();

sabotagesRoutes.post("/sabotages", sabotagesController.executeSabotage);
