import { Resource } from './constants/resources';

export interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: {
    resourceCompletion: number;
    timeBonus: number;
    perfectRound: number;
  };
}

export interface RoundScore {
  points: number;
  resourcesCollected: number;
  resourcesCompleted: number;
  timeBonus: number;
}

export interface ResourceState {
  type: Resource;
  required: number;
  collected: number;
}