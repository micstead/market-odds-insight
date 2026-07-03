export interface Modifiers {
  missingPlayersValue: number; // in Millions Euro
  motivation: number; // 1-100 percentage
}

export interface PredictionResult {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeValue: number;
  awayValue: number;
  homeProb: number;
  drawProb: number;
  awayProb: number;
}

/**
 * Calculates 1x2 odds based on market values and modifiers
 * @param homeMarketValue Initial market value of home team
 * @param awayMarketValue Initial market value of away team
 * @param homeMods Modifiers for home team
 * @param awayMods Modifiers for away team
 * @returns PredictionResult containing probabilities and decimal odds
 */
export function calculateOdds(
  homeMarketValue: number,
  awayMarketValue: number,
  homeMods: Modifiers,
  awayMods: Modifiers
): PredictionResult {
  // Apply modifiers
  const homeAdjusted = Math.max(1, (homeMarketValue - homeMods.missingPlayersValue) * (homeMods.motivation / 100));
  const awayAdjusted = Math.max(1, (awayMarketValue - awayMods.missingPlayersValue) * (awayMods.motivation / 100));

  // Base probabilities based on value ratio
  const total = homeAdjusted + awayAdjusted;
  const pA = homeAdjusted / total;
  const pB = awayAdjusted / total;

  // Draw factor logic: 
  // Soccer has a significant draw probability even when teams are mismatched.
  // We'll use a base draw of 26% and reduce it slightly as the gap widens.
  const drawBase = 0.26;
  // Parity factor: 1 when perfectly balanced, 0 when infinitely unbalanced
  const parity = 1 - Math.abs(pA - pB);
  const drawProb = drawBase * parity;

  // Distribute remaining probability between Win and Loss
  const remaining = 1 - drawProb;
  const homeProb = pA * remaining;
  const awayProb = pB * remaining;

  // Convert probabilities to decimal odds (1/p)
  // Ensure we don't divide by zero
  const homeWin = parseFloat((1 / Math.max(0.01, homeProb)).toFixed(2));
  const draw = parseFloat((1 / Math.max(0.01, drawProb)).toFixed(2));
  const awayWin = parseFloat((1 / Math.max(0.01, awayProb)).toFixed(2));

  return {
    homeWin,
    draw,
    awayWin,
    homeValue: homeAdjusted,
    awayValue: awayAdjusted,
    homeProb: parseFloat((homeProb * 100).toFixed(1)),
    drawProb: parseFloat((drawProb * 100).toFixed(1)),
    awayProb: parseFloat((awayProb * 100).toFixed(1)),
  };
}
