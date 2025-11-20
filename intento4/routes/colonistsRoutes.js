import express from "express";
import { colonistsController } from "../controllers/colonistsController.js";

export const colonistsRoutes = express.Router();

colonistsRoutes.get("/colonists", colonistsController.getAll);

colonistsRoutes.post("/colonists", colonistsController.createColonist);

colonistsRoutes.patch(
  "/colonists/:id/recover",
  colonistsController.healColonist
);
