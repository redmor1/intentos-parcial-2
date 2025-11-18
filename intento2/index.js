const express = require("express");
const netrunnersRouters = require("./routes/netrunnersRouters");
const loggingMiddleware = require("./middlewares/logging");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const serversRouters = require("./routes/serversRouters");

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(loggingMiddleware);
app.use(netrunnersRouters);
app.use(serversRouters);

app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

module.exports = app;
