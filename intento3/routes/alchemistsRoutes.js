import express from "express";
import alchemistsControllers from "../controllers/alchemistsControllers.js";

export const alchemistsRoutes = express.Router();

alchemistsRoutes.get("/alchemists", alchemistsControllers.getAll);

alchemistsRoutes.post("/alchemists", alchemistsControllers.createAlchemist);

alchemistsRoutes.patch(
  "/alchemists/:id/artifacts",
  alchemistsControllers.addArtifactToInventory
);
