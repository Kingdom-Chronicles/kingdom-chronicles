export type PackType = 'healing' | 'wealth' | 'wisdom';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type BibleVersion = 'NKJV' | 'KJV' | 'NIV' | 'ESV';

export interface BibleVerse {
  verse: string;
  description: string;
  packType: PackType;
  versions: {
    [key in BibleVersion]?: string;
  };
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  packType: PackType;
  difficulty: DifficultyLevel;
  maxAttempts: number;
  bibleVersion: BibleVersion;
  points: {
    correct: number;
    timeBonus: number;
  };
}

export interface RoundScore {
  points: number;
  versesCompleted: number;
  timeBonus: number;
  failedVerses: VerseAttempt[];
}

export interface VerseAttempt {
  verse: string;
  expectedAnswer: string;
  userAnswer: string;
  similarity: number;
  attempts: number;
}

export interface AnswerFeedback {
  isCorrect: boolean;
  similarity: number;
  message: string;
  attemptsLeft: number;
}