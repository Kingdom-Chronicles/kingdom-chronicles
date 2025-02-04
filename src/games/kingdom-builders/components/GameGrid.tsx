import React from 'react';
import { GridCell } from './GridCell';
import type { BuildingType } from '../types';

interface GameGridProps {
  grid: (BuildingType | null)[][];
  onCellClick: (row: number, col: number) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({ grid, onCellClick }) => {
  return (
    <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-lg shadow">
      {grid.map((row, i) => (
        row.map((cell, j) => (
          <GridCell
            key={`${i}-${j}`}
            building={cell}
            onClick={() => onCellClick(i, j)}
          />
        ))
      ))}
    </div>
  );
};