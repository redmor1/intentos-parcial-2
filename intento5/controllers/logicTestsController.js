import { logicTestsServices } from "../services/logicTestsServices.js";
export const logicTestsController = {
  createLogicTest: async function createLogicTest(req, res, next) {
    try {
      const data = req.body;
      const logicTest = await logicTestsServices.createLogicTest(data);
      return res.status(200).json({ logicTest });
    } catch (e) {
      throw e;
    }
  },
  attemptLogicTest: async function attemptLogicTest(req, res, next) {
    try {
      let logicTestId = req.params.logicTestId;
      let data = req.body;
      if (!logicTestId) {
        throw new Error("Falta el logicTestId en los params");
      }
      logicTestId = Number(logicTestId);
      const logicTestAttempt = await logicTestsServices.attemptLogicTest(
        logicTestId,
        data
      );
      return res.status(200).json({ logicTestAttempt });
    } catch (e) {
      throw e;
    }
  },
};
