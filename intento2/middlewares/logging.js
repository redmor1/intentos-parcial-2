const fs = require("fs");

async function loggingMiddleware(req, res, next) {
  console.log(req.method, req.originalUrl);
  let log = {
    date: new Date().toISOString(),
    action: `${req.method} ${req.originalUrl}`,
  };
  const fileData = await fs.promises.readFile(
    "./database/logging.json",
    "utf-8"
  );
  const fileJson = JSON.parse(fileData);
  fileJson.push(log);

  await fs.promises.writeFile(
    "./database/logging.json",
    JSON.stringify(fileJson),
    "utf-8"
  );

  next();
}

module.exports = loggingMiddleware;
