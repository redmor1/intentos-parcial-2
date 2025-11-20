import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logging } from "./middlewares/logging.js";
import { botsRoutes } from "./routes/botsRoutes.js";
import { tracksRoutes } from "./routes/tracksRoutes.js";
import { logicTestsRoutes } from "./routes/logicTestsRoutes.js";
import { duelsRoutes } from "./routes/duelsRoutes.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(logging);
app.use(botsRoutes);
app.use(tracksRoutes);
app.use(logicTestsRoutes);
app.use(duelsRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on PORT${PORT}`);
});
