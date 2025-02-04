import { GRID_SIZE } from '../constants/game';
import type { BuildingType } from '../types';

export const getAdjacentCells = (
  grid: (BuildingType | null)[][],
  row: number,
  col: number
): BuildingType[] => {
  const adjacent: BuildingType[] = [];
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    
    if (isValidCell(newRow, newCol) && grid[newRow][newCol]) {
      adjacent.push(grid[newRow][newCol]!);
    }
  }

  return adjacent;
};

export const isValidCell = (row: number, col: number): boolean => {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
};

export const createEmptyGrid = (): (BuildingType | null)[][] => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
};