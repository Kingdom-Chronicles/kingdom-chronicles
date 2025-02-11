import React from 'react';
import { BUILDINGS } from '../constants/buildings';
import { BuildingCard } from './BuildingCard';
import type { BuildingType } from '../types';

interface BuildingSelectorProps {
  selectedBuilding: BuildingType | null;
  onSelectBuilding: (building: BuildingType) => void;
}

export const BuildingSelector: React.FC<BuildingSelectorProps> = ({
  selectedBuilding,
  onSelectBuilding,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {Object.entries(BUILDINGS).map(([key, building]) => (
        <BuildingCard
          key={key}
          buildingKey={key as BuildingType}
          building={building}
          isSelected={selectedBuilding === key}
          onSelect={() => onSelectBuilding(key as BuildingType)}
        />
      ))}
    </div>
  );
};