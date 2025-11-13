const express = require("express");
const cors = require("cors");
const guardiansRouter = require("./routes/guardians.routes");
const { loggingMiddleware } = require("./middlewares/logging");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(loggingMiddleware);

app.use(guardiansRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { app };
