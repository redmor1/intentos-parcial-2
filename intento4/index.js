import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logging } from "./middlewares/logging.js";
import { colonistsRoutes } from "./routes/colonistsRoutes.js";
import { expeditionsRoutes } from "./routes/expeditionsRoutes.js";
import { sabotagesRoutes } from "./routes/sabotagesRoutes.js";

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(logging);

app.use(colonistsRoutes);
app.use(expeditionsRoutes);
app.use(sabotagesRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
