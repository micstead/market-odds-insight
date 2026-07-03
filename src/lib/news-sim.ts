export interface SituationReport {
  motivation: number; // 0-100
  missingPlayersValue: number; // in Millions Euro
  report: string;
}

const MOTIVATION_MESSAGES = [
  "Team is fighting for the title. Motivation is peak.",
  "High stakes derby match. Expecting full intensity.",
  "Players are motivated after recent wins.",
  "Normal league game. Motivation is standard.",
  "Team is safe in mid-table. Might lack some bite.",
  "Internal conflicts reported in the dressing room.",
  "Coach announced departure at end of season.",
  "Relegation battle. Survival instinct is high."
];

const INJURY_MESSAGES = [
  "Full squad available. No major injuries.",
  "Key striker missing due to hamstring injury.",
  "Starting goalkeeper is out for 3 weeks.",
  "Multiple defensive starters missing.",
  "Star player returned from injury but might not be 100%.",
  "Midfield general suspended for this match.",
  "Rotation expected due to upcoming European clash."
];

export function simulateOnlineCheck(teamName: string, marketValue: number): SituationReport {
  // Use teamName as seed for deterministic randomness during a session
  const seed = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Random motivation (60-100)
  const motivation = 60 + (seed % 41);
  
  // Random missing player value (0-15% of market value)
  const missingPercent = (seed % 16);
  const missingPlayersValue = Math.round((marketValue * missingPercent) / 100);

  const motMsg = MOTIVATION_MESSAGES[seed % MOTIVATION_MESSAGES.length];
  const injMsg = INJURY_MESSAGES[seed % INJURY_MESSAGES.length];

  return {
    motivation,
    missingPlayersValue,
    report: `${motMsg} ${injMsg}`
  };
}
