const express = require("express");
const cors = require("cors");
const guardiansRouter = require("./routes/guardians.routes");
const { loggingMiddleware } = require("./middlewares/logging");
const challengesRouter = require("./routes/challenges.routes");
const duelsRouter = require("./routes/duels.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(loggingMiddleware);

app.use(guardiansRouter);
app.use(challengesRouter);
app.use(duelsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { app };
