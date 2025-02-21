export interface BibleVerse {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
  options: string[];
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: {
    correct: number;
    timeBonus: number;
  };
}

export interface VerseAttempt {
  verseText: string;
  correctReference: string;
  userAnswer: string | null;
  isCorrect: boolean;
}

export interface RoundScore {
  points: number;
  versesFound: number;
  timeBonus: number;
  attempts: VerseAttempt[];
}