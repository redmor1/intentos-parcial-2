import { readDB, writeDB } from "../utils/database.js";

export const logicTestsRepository = {
  create: async function create(data) {
    const fileJson = await readDB();
    fileJson.logicTests.push(data);

    await writeDB(fileJson);
    return data;
  },
  getById: async function getById(id) {
    const fileJson = await readDB();
    const logicTests = fileJson.logicTests;
    const logicTest = logicTests.find((lt) => lt.id === id);
    if (!logicTest) {
      throw new Error(`No se encontro el logicTest con el id ${id}`);
    }

    return logicTest;
  },
  attemptLogicTest: async function attemptLogicTest(logicTestId, data) {
    const fileJson = await readDB();
    const logicTests = fileJson.logicTests;
    const logicTest = logicTests.find((lt) => lt.id === logicTestId);
    if (!logicTest) {
      throw new Error(`No se encontro el logicTest con el id ${id}`);
    }

    await writeDB(fileJson);
    return data;
  },
};
