export type Testament = 'old' | 'new';
export type GameMode = 'books' | 'stories';

export interface BibleBook {
  name: string;
  testament: Testament;
  description: string;
}

export interface BibleStory {
  id: string;
  title: string;
  description: string;
  testament: Testament;
  scripture: string;
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  gameMode: GameMode;
  points: {
    correct: number;
    timeBonus: number;
  };
}

export interface RoundScore {
  points: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeBonus: number;
  questions: QuestionHistory[];
}

export interface QuestionHistory {
  bookName: string;
  description: string;
  correctTestament: Testament;
  userAnswer: Testament;
  isCorrect: boolean;
}