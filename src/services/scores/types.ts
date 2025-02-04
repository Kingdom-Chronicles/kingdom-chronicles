export interface GameScore {
  userId: string;
  gameId: string;
  score: number;
  timestamp: string;
  username: string;
}

export interface LeaderboardEntry {
  username: string;
  totalScore: number;
  rank: number;
}

export interface GameScoreUpdate {
  gameType: string;
  score: number;
  timestamp: string;
}