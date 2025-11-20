import { readDB, writeDB } from "../utils/database.js";

export const sabotagesRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    const sabotages = fileJson.sabotages;
    sabotages.push(data);

    await writeDB(fileJson);
    return data;
  },
};
