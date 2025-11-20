export function levelUp(bot) {
  let requiredXp = 50 + bot.rank ** 2 * 10;

  while (bot.xp >= requiredXp) {
    bot.rank += 1;
    bot.xp -= requiredXp;
    requiredXp = 50 + bot.rank ** 2 * 10;
  }
  return bot;
}

export function penaltyFormula(track, bot) {
  const extraPenalty = (track.processingDemand - bot.processing) / 5;

  return extraPenalty;
}

export function baseXpFormula(track) {
  return track.complexity * 10 + Math.floor(track.length / 20);
}

export function evaluateFormula(formulaStr, context) {
  const keys = Object.keys(context);
  const values = Object.values(context);
  const fn = new Function(...keys, `return ${formulaStr}`);

  return fn(...values);
}
