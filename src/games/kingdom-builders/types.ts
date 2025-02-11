export type BuildingType = 'house' | 'church' | 'garden' | 'workshop';

export interface BuildingData {
  type: BuildingType;
  icon: React.ReactNode;
  cost: number;
  points: number;
  description: string;
}

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: {
    base: number;
    adjacentBonus: number;
    completionBonus: number;
  };
}

export interface RoundScore {
  points: number;
  buildings: number;
  adjacentBonuses: number;
  completionBonus: boolean;
}