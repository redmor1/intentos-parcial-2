function calculateDataYieldFormula(formulaStr, context) {
  const keys = Object.keys(context);
  const values = Object.values(context);

  const fn = new Function(...keys, `return ${formulaStr}`);

  return fn(...values);
}

function levelUp(netrunner) {
  let requiredData = netrunner.reputation * 150;

  while (netrunner.data >= requiredData) {
    netrunner.reputation += 1;
    netrunner.data -= requiredData;
    // bonus, restaurar ram
    netrunner.ram = 128;
  }
}

module.exports = { calculateDataYieldFormula, levelUp };
