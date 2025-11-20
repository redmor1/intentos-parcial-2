import fs from "fs";

const FILE_PATH = "./database/league.json";

export async function readDB() {
  const fileData = await fs.promises.readFile(FILE_PATH, "utf-8");
  const fileJson = JSON.parse(fileData);

  return fileJson;
}

export async function writeDB(newFileJson) {
  await fs.promises.writeFile(
    FILE_PATH,
    JSON.stringify(newFileJson, null, 2),
    "utf-8"
  );
}
