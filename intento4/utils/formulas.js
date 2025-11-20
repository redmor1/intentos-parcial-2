export function evaluateFormula(
  formulaStr,
  contextExpedition,
  contextColonist
) {
  try {
    const stats = contextColonist.stats || {};
    const scope = {
      ...contextColonist,
      ...contextExpedition,
      ...stats,
    };

    let keys = Object.keys(scope);
    let values = Object.values(scope);

    const fn = new Function(...keys, `return ${formulaStr}`);

    const result = fn(...values);

    return result;
  } catch (e) {
    throw new Error(`Error valuando la formula: ${e} `);
  }
}

export function levelUp(colonist) {
  if (
    colonist.xp >= 5000 &&
    (colonist.stats.intelligence > 15 || colonist.stats.strength > 15) &&
    colonist.stats.adaptability > 30
  ) {
    colonist.rank = "Commander";
  }

  if (
    colonist.xp >= 1000 &&
    (colonist.stats.intelligence > 15 || colonist.stats.strength > 15)
  ) {
    colonist.rank = "Specialist";
  }

  // hacer un getExpeditionsFromColonist

  return colonist;
}

export function attackPowerFormula(colonist) {
  const attackPower =
    colonist.intelligence * 0.8 +
    colonist.adaptability * 1.2 +
    colonist.xp / 100;
  return attackPower;
}

export function defensePowerFormula(colonist) {
  const defensePower = colonist.strength * 1.5 + colonist.oxygen / 2;
  return defensePower;
}
