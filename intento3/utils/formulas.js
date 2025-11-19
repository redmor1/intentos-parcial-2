export function evaluateFormulas(formulaStr, context) {
  const keys = Object.keys(context);
  const values = Object.values(context);

  const fn = new Function(...keys, `return ${formulaStr}`);

  const result = fn(...values);
  return result;
}

export function levelUp(alchemist) {
  const requiredWisdomPoints = alchemist.rank * 100;

  while (alchemist.wisdomPoints >= requiredWisdomPoints) {
    alchemist.rank += 1;
    alchemist.wisdomPoints -= requiredWisdomPoints;
  }
}
