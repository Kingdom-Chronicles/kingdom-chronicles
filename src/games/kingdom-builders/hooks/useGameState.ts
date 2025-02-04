import { useState, useCallback, useMemo } from 'react';
import { BUILDINGS } from '../constants/buildings';
import { createEmptyGrid, getAdjacentCells } from '../utils/grid';
import { INITIAL_RESOURCES } from '../constants/game';
import type { BuildingType, RoundScore } from '../types';

export const useGameState = () => {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [grid, setGrid] = useState<(BuildingType | null)[][]>(createEmptyGrid());
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!selectedBuilding || grid[row][col]) return;
    
    const building = BUILDINGS[selectedBuilding];
    if (resources >= building.cost) {
      setGrid(prev => {
        const newGrid = prev.map(r => [...r]);
        newGrid[row][col] = selectedBuilding;
        return newGrid;
      });
      setResources(prev => prev - building.cost);
    }
  }, [selectedBuilding, resources, grid]);

  const calculateScore = useCallback((): RoundScore => {
    let points = 0;
    let buildingCount = 0;
    let adjacentBonusCount = 0;
    let hasCompletedSection = false;

    // Calculate points for each building
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const building = grid[row][col];
        if (building) {
          buildingCount++;
          points += BUILDINGS[building].points;

          // Check for adjacent buildings
          const adjacentBuildings = getAdjacentCells(grid, row, col);
          if (adjacentBuildings.length > 0) {
            adjacentBonusCount++;
            points += 50;
          }
        }
      }
    }

    // Check for completed sections
    for (let row = 0; row < grid.length - 2; row++) {
      for (let col = 0; col < grid[row].length - 2; col++) {
        if (isCompletedSection(grid, row, col)) {
          hasCompletedSection = true;
          points += 200;
          break;
        }
      }
      if (hasCompletedSection) break;
    }

    return {
      points,
      buildings: buildingCount,
      adjacentBonuses: adjacentBonusCount,
      completionBonus: hasCompletedSection
    };
  }, [grid]);

  const resetGame = useCallback(() => {
    setGrid(createEmptyGrid());
    setResources(INITIAL_RESOURCES);
    setSelectedBuilding(null);
  }, []);

  return {
    resources,
    grid,
    selectedBuilding,
    setSelectedBuilding,
    handleCellClick,
    calculateScore,
    resetGame
  };
};

// Helper function to check for completed 3x3 sections
const isCompletedSection = (grid: (BuildingType | null)[][], startRow: number, startCol: number): boolean => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!grid[startRow + i][startCol + j]) {
        return false;
      }
    }
  }
  return true;
};