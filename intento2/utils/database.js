const fs = require("fs");

const FILE_PATH = "./database/network.json";

async function readDB() {
  try {
    const fileData = await fs.promises.readFile(FILE_PATH, "utf-8");
    const fileJson = JSON.parse(fileData);
    return fileJson;
  } catch (e) {
    throw e;
  }
}

async function writeDB(newFileJson) {
  try {
    const fileData = await fs.promises.writeFile(
      FILE_PATH,
      JSON.stringify(newFileJson),
      "utf-8"
    );
    return newFileJson;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  readDB,
  writeDB,
};
