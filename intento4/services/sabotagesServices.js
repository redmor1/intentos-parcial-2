import { sabotagesRepository } from "../repositories/sabotagesRepository.js";
import { attackPowerFormula, defensePowerFormula } from "../utils/formulas.js";
import { colonistsServices } from "./colonistsServices.js";

export const sabotagesServices = {
  executeSabotage: async function executeSabotage(attackerId, defenderId) {
    const attacker = await colonistsServices.getById(attackerId);
    const defender = await colonistsServices.getById(defenderId);

    const attackPower = attackPowerFormula(attacker);
    const defensePower = defensePowerFormula(defender);

    let sabotageObject = {
      attackerId: attackerId,
      defenderId: defenderId,
      winner: null,
    };

    if (attackPower > defensePower) {
      const creditsToSteal = Math.floor(defender.credits * 0.2);
      attacker.credits += creditsToSteal;
      defender.credits += creditsToSteal;
      if (Math.abs(attackPower, defensePower) > 50) {
        defender.status = "INJURED";
      }
      sabotageObject.winner = attackerId;
    } else {
      defender.xp += 50;
      attacker.credits += 50;
      attacker.oxygen += 10;
      sabotageObject.winner = defenderId;
    }

    // guardar cambios en attacker y defender
    await colonistsServices.modifyColonist(attackerId, attacker);
    await colonistsServices.modifyColonist(defenderId, defender);
    const sabotages = await sabotagesRepository.create(sabotageObject);
    return sabotages;
  },
};
