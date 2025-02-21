import React from 'react';
import type { BuildingType, BuildingData } from '../types';

interface BuildingCardProps {
  buildingKey: BuildingType;
  building: BuildingData;
  isSelected: boolean;
  onSelect: () => void;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({
  buildingKey,
  building,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 transition-all ${
        isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-center mb-2">
        {building.icon}
      </div>
      <div className="text-sm font-semibold">{buildingKey}</div>
      <div className="text-xs text-gray-500">Cost: {building.cost}</div>
      <div className="text-xs text-gray-500 mt-1">{building.description}</div>
    </button>
  );
};