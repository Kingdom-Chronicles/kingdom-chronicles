import { GRID_SIZES, TERRAIN_DISTRIBUTION } from '../constants/game';
import type { GridCell, TerrainType, BuildingType } from '../types';

export const createEmptyGrid = (size: 'small' | 'medium' | 'large'): GridCell[][] => {
  const gridSize = GRID_SIZES[size];
  const grid: GridCell[][] = [];

  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let col = 0; col < gridSize; col++) {
      grid[row][col] = {
        terrain: generateTerrain(),
        building: null,
        isHighlighted: false,
        canPlace: false
      };
    }
  }

  // Ensure at least some grass tiles for starting
  ensureStartingArea(grid);
  
  return grid;
};

const generateTerrain = (): TerrainType => {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [terrain, probability] of Object.entries(TERRAIN_DISTRIBUTION)) {
    cumulative += probability;
    if (rand <= cumulative) {
      return terrain as TerrainType;
    }
  }
  
  return 'grass'; // fallback
};

const ensureStartingArea = (grid: GridCell[][]) => {
  const centerRow = Math.floor(grid.length / 2);
  const centerCol = Math.floor(grid[0].length / 2);
  
  // Ensure 3x3 area around center has some grass
  for (let row = Math.max(0, centerRow - 1); row <= Math.min(grid.length - 1, centerRow + 1); row++) {
    for (let col = Math.max(0, centerCol - 1); col <= Math.min(grid[0].length - 1, centerCol + 1); col++) {
      if (Math.random() < 0.7) {
        grid[row][col].terrain = 'grass';
      }
    }
  }
};

export const getAdjacentCells = (
  grid: GridCell[][],
  row: number,
  col: number
): { row: number; col: number; cell: GridCell }[] => {
  const adjacent: { row: number; col: number; cell: GridCell }[] = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    
    if (isValidCell(grid, newRow, newCol)) {
      adjacent.push({
        row: newRow,
        col: newCol,
        cell: grid[newRow][newCol]
      });
    }
  }

  return adjacent;
};

export const getCellsInRadius = (
  grid: GridCell[][],
  row: number,
  col: number,
  radius: number
): { row: number; col: number; cell: GridCell }[] => {
  const cells: { row: number; col: number; cell: GridCell }[] = [];
  
  for (let r = row - radius; r <= row + radius; r++) {
    for (let c = col - radius; c <= col + radius; c++) {
      if (isValidCell(grid, r, c) && !(r === row && c === col)) {
        const distance = Math.max(Math.abs(r - row), Math.abs(c - col));
        if (distance <= radius) {
          cells.push({
            row: r,
            col: c,
            cell: grid[r][c]
          });
        }
      }
    }
  }
  
  return cells;
};

export const isValidCell = (grid: GridCell[][], row: number, col: number): boolean => {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
};

export const canPlaceBuilding = (
  grid: GridCell[][],
  row: number,
  col: number,
  buildingType: BuildingType,
  buildings: any
): boolean => {
  const cell = grid[row][col];
  
  // Can't place on occupied cells
  if (cell.building) return false;
  
  // Can't place on water
  if (cell.terrain === 'water') return false;
  
  const building = buildings[buildingType];
  
  // Check terrain requirements
  if (building.requires && !building.requires.includes(cell.terrain)) {
    // Special case for desert - check if well is nearby
    if (cell.terrain === 'desert') {
      const adjacent = getAdjacentCells(grid, row, col);
      const hasNearbyWell = adjacent.some(({ cell }) => cell.building === 'well');
      if (!hasNearbyWell) return false;
    } else {
      return false;
    }
  }
  
  return true;
};

export const calculateConnectedWalls = (grid: GridCell[][], row: number, col: number): number => {
  const visited = new Set<string>();
  const stack = [{ row, col }];
  let count = 0;
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    const key = `${current.row},${current.col}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    
    if (!isValidCell(grid, current.row, current.col)) continue;
    if (grid[current.row][current.col].building !== 'wall') continue;
    
    count++;
    
    // Add adjacent cells (only orthogonal for walls)
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of directions) {
      stack.push({ row: current.row + dx, col: current.col + dy });
    }
  }
  
  return count;
};