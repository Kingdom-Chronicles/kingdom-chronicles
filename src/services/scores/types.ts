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
  gameType?: string;
}

export interface GameScoreUpdate {
  gameType: string;
  score: number;
  timestamp: string;
}

// New types for progress tracking
export interface GameProgress {
  userId: string;
  gameType: 'scripture-sprint' | 'bible-verse';
  lastPlayed: string;
  streak: number;
  timestamp: string;
}

export interface FailedAnswer {
  userId: string;
  gameType: 'scripture-sprint' | 'bible-verse';
  question: string;
  correctAnswer: string;
  userAnswer: string;
  timestamp: string;
  reminderCount: number;
  lastReminded?: string;
}