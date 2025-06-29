import type { TerrainType, Resources } from '../types';

export const GRID_SIZES = {
  small: 6,
  medium: 8,
  large: 10
};

export const INITIAL_RESOURCES: Record<string, Resources> = {
  easy: { wood: 15, stone: 10, food: 8, faith: 3 },
  medium: { wood: 12, stone: 8, food: 6, faith: 2 },
  hard: { wood: 10, stone: 6, food: 4, faith: 1 }
};

export const RESOURCE_GENERATION_PER_TURN = {
  wood: 2,
  stone: 1,
  food: 3,
  faith: 1
};

export const TERRAIN_DISTRIBUTION = {
  grass: 0.4,
  forest: 0.25,
  mountain: 0.2,
  water: 0.1,
  desert: 0.05
};

export const SCORE_MULTIPLIERS = {
  ADJACENT_BONUS: 1.5,
  COMBO_BONUS: 2,
  EFFICIENCY_BONUS: 1.2,
  COMPLETION_BONUS: 3
};

export const ACHIEVEMENTS = [
  {
    id: 'first_kingdom',
    title: 'First Kingdom',
    description: 'Build your first building',
    condition: (gameState: any) => gameState.buildingCount > 0
  },
  {
    id: 'holy_city',
    title: 'Holy City',
    description: 'Build 3 churches in one game',
    condition: (gameState: any) => gameState.buildingCounts.church >= 3
  },
  {
    id: 'master_builder',
    title: 'Master Builder',
    description: 'Fill the entire grid with buildings',
    condition: (gameState: any) => gameState.gridFilled
  },
  {
    id: 'efficient_ruler',
    title: 'Efficient Ruler',
    description: 'Complete a game using less than 80% of available resources',
    condition: (gameState: any) => gameState.resourceEfficiency > 0.8
  },
  {
    id: 'strategic_mind',
    title: 'Strategic Mind',
    description: 'Get 10 adjacency bonuses in one game',
    condition: (gameState: any) => gameState.adjacencyBonuses >= 10
  }
];
