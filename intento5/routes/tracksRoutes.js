import express from "express";
import { tracksController } from "../controllers/tracksController.js";

export const tracksRoutes = express.Router();

tracksRoutes.post("/tracks", tracksController.createTrack);

tracksRoutes.post("/tracks/:trackId/train/:botId", tracksController.train);
