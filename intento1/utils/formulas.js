function calculateRewardFormula(difficulty, energyCost, jsFormula) {
  try {
    const formulaFunction = new Function(
      `difficulty`,
      `energyCost`,
      `return ${jsFormula}`
    );
    return formulaFunction(difficulty, energyCost);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function calculateWinnerDuelFormula(guardian1, guardian2) {
  try {
    const guardian1Power =
      guardian1.level ** 2 +
      guardian1.xp / 5 +
      guardian1.energy +
      guardian1.items.reduce(
        (total, currentValue = 0) => (currentValue += total),
        0
      );
    const guardian2Power =
      guardian2.level ** 2 +
      guardian2.xp / 5 +
      guardian2.energy +
      guardian2.items.reduce(
        (total, currentValue) => (currentValue += total),
        0
      );
    if (guardian1Power > guardian2Power) {
      return {
        id: Math.floor(Math.random() * 1000000),
        guardian1: guardian1.id,
        guardian2: guardian2.id,
        winner: guardian1.id,
        power1: guardian1Power,
        power2: guardian2Power,
        timeStamp: new Date().toISOString(),
      };
    } else {
      return {
        id: Math.floor(Math.random() * 1000000),
        guardian1: guardian1.id,
        guardian2: guardian2.id,
        winner: guardian2.id,
        power1: guardian1Power,
        power2: guardian2Power,
        timeStamp: new Date().toISOString(),
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function calculateExp(guardian1Power, guardian2Power) {
  let difference = Math.abs(guardian1Power - guardian2Power);

  if (difference <= 10) {
    return 20;
  }

  if (difference <= 25) {
    return 50;
  }

  if (difference <= 50) {
    return 80;
  }

  if (difference > 50) {
    return 120;
  }
}

module.exports = {
  calculateRewardFormula,
  calculateWinnerDuelFormula,
  calculateExp,
};
