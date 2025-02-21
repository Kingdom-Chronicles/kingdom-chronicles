import { BUILDINGS } from '../constants/buildings';
import { SCORE_MULTIPLIERS } from '../constants/game';
import type { BuildingType } from '../types';

export const calculateBuildingScore = (
  building: BuildingType,
  adjacentBuildings: BuildingType[]
): number => {
  const baseScore = BUILDINGS[building].points;
  let score = baseScore;

  // Add bonus for adjacent complementary buildings
  if (hasComplementaryBuildings(building, adjacentBuildings)) {
    score *= SCORE_MULTIPLIERS.ADJACENT_BONUS;
  }

  return score;
};

const hasComplementaryBuildings = (
  building: BuildingType,
  adjacentBuildings: BuildingType[]
): boolean => {
  const complementaryPairs: Record<BuildingType, BuildingType[]> = {
    house: ['garden', 'church'],
    church: ['house', 'garden'],
    garden: ['house', 'workshop'],
    workshop: ['house', 'garden']
  };

  return adjacentBuildings.some(adjacent => 
    complementaryPairs[building].includes(adjacent)
  );
};