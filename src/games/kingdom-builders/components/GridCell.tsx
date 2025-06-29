import React from 'react';
import { BUILDINGS, TERRAIN_COLORS } from '../constants/buildings';
import type { GridCell as GridCellType } from '../types';

interface GridCellProps {
  cell: GridCellType;
  onClick: () => void;
  className?: string;
  showPlacementHint?: boolean;
}

export const GridCell: React.FC<GridCellProps> = ({ 
  cell, 
  onClick, 
  className = 'w-12 h-12',
  showPlacementHint = false 
}) => {
  const getTerrainClass = () => {
    const baseClass = TERRAIN_COLORS[cell.terrain];
    
    if (cell.terrain === 'water') {
      return `${baseClass} animate-pulse`;
    }
    
    return baseClass;
  };

  const getCellClass = () => {
    let classes = `${className} border border-gray-600 rounded transition-all duration-200 cursor-pointer relative overflow-hidden `;
    
    // Terrain background
    classes += getTerrainClass() + ' ';
    
    // Building overlay
    if (cell.building) {
      classes += 'ring-2 ring-yellow-400 ';
    }
    
    // Placement hints
    if (showPlacementHint) {
      if (cell.canPlace) {
        classes += 'ring-2 ring-green-400 hover:ring-green-300 hover:bg-green-100 ';
      } else if (!cell.building) {
        classes += 'opacity-50 ';
      }
    }
    
    // Hover effects
    if (!cell.building && cell.canPlace) {
      classes += 'hover:scale-105 hover:shadow-lg ';
    }
    
    return classes;
  };

  const getTerrainIcon = () => {
    switch (cell.terrain) {
      case 'forest':
        return '🌲';
      case 'mountain':
        return '⛰️';
      case 'water':
        return '💧';
      case 'desert':
        return '🏜️';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      className={getCellClass()}
      title={`${cell.terrain}${cell.building ? ` - ${cell.building}` : ''}`}
    >
      {/* Terrain indicator */}
      <div className="absolute top-0 left-0 text-xs opacity-60">
        {getTerrainIcon()}
      </div>
      
      {/* Building */}
      {cell.building && (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-800 drop-shadow-sm">
            {BUILDINGS[cell.building].icon}
          </div>
        </div>
      )}
      
      {/* Placement indicator */}
      {showPlacementHint && cell.canPlace && !cell.building && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
      )}
    </button>
  );
};