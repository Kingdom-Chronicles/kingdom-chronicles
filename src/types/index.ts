export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  achievements: Achievement[];
  password?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  difficulty: 'easy' | 'medium' | 'hard';
}