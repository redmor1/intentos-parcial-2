import fs from "fs";

const FILE_PATH = "./database/alchemy.json";

export async function readDB() {
  try {
    const fileData = await fs.promises.readFile(FILE_PATH, "utf-8");
    const fileJson = JSON.parse(fileData);

    return fileJson;
  } catch (e) {
    throw e;
  }
}

export async function writeDB(newFileJson) {
  try {
    await fs.promises.writeFile(
      FILE_PATH,
      JSON.stringify(newFileJson),
      "utf-8"
    );
  } catch (e) {
    throw e;
  }
}
