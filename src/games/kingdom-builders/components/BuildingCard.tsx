import React from 'react';
import type { BuildingType, BuildingData, Resources } from '../types';

interface BuildingCardProps {
  buildingKey: BuildingType;
  building: BuildingData;
  isSelected: boolean;
  canAfford: boolean;
  onSelect: () => void;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({
  buildingKey,
  building,
  isSelected,
  canAfford,
  onSelect,
}) => {
  const getCardClass = () => {
    let classes = 'p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ';
    
    if (isSelected) {
      classes += 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 ';
    } else if (canAfford) {
      classes += 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 ';
    } else {
      classes += 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed ';
    }
    
    return classes;
  };

  return (
    <button
      onClick={canAfford ? onSelect : undefined}
      className={getCardClass()}
      disabled={!canAfford}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`mb-2 ${canAfford ? 'text-gray-700' : 'text-gray-400'}`}>
          {building.icon}
        </div>
        <div className={`text-sm font-semibold mb-1 capitalize ${canAfford ? 'text-gray-900' : 'text-gray-500'}`}>
          {buildingKey.replace(/([A-Z])/g, ' $1').trim()}
        </div>
        <div className={`text-xs mb-2 ${canAfford ? 'text-gray-600' : 'text-gray-400'}`}>
          {building.points} pts
        </div>
        
        {/* Cost display */}
        <div className="flex flex-wrap gap-1 justify-center">
          {Object.entries(building.cost).map(([resource, cost]) => (
            <span 
              key={resource}
              className={`text-xs px-1 py-0.5 rounded ${
                canAfford ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {resource.charAt(0).toUpperCase()}: {cost}
            </span>
          ))}
        </div>
        
        {/* Produces indicator */}
        {building.produces && building.produces.length > 0 && (
          <div className="mt-1 text-xs text-green-600">
            +{building.produces.map(r => r.charAt(0).toUpperCase()).join(',')}
          </div>
        )}
      </div>
    </button>
  );
};