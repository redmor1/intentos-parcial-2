import express from "express";

import errorHandler from "./middlewares/errorHandler.js";
import { tournamentsRoutes } from "./routes/tournamentsRoutes.js";
import { formulasRoutes } from "./routes/formulasRoutes.js";
import { alchemistsRoutes } from "./routes/alchemistsRoutes.js";
import logging from "./middlewares/logging.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(alchemistsRoutes);
app.use(formulasRoutes);
app.use(tournamentsRoutes);
app.use(logging);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
