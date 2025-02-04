import React from 'react';
import { BUILDINGS } from '../constants/buildings';
import type { BuildingType } from '../types';

interface GridCellProps {
  building: BuildingType | null;
  onClick: () => void;
}

export const GridCell: React.FC<GridCellProps> = ({ building, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`aspect-square border-2 rounded transition-all ${
        building 
          ? 'bg-indigo-100 border-indigo-300' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {building && BUILDINGS[building].icon}
    </button>
  );
};