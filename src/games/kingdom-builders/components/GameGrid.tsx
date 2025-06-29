import React from 'react';
import { GridCell } from './GridCell';
import type { GridCell as GridCellType, BuildingType } from '../types';

interface GameGridProps {
  grid: GridCellType[][];
  onCellClick: (row: number, col: number) => void;
  selectedBuilding: BuildingType | null;
}

export const GameGrid: React.FC<GameGridProps> = ({ grid, onCellClick, selectedBuilding }) => {
  const gridSize = grid.length;
  const cellSize = gridSize <= 6 ? 'w-16 h-16' : gridSize <= 8 ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <div className="flex justify-center mb-6">
      <div 
        className={`grid gap-1 bg-gray-800 p-4 rounded-lg shadow-lg`}
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          maxWidth: '600px'
        }}
      >
        {grid.map((row, i) => (
          row.map((cell, j) => (
            <GridCell
              key={`${i}-${j}`}
              cell={cell}
              onClick={() => onCellClick(i, j)}
              className={cellSize}
              showPlacementHint={selectedBuilding !== null}
            />
          ))
        ))}
      </div>
    </div>
  );
};