import React from 'react';
import { BUILDINGS } from '../constants/buildings';
import { BuildingCard } from './BuildingCard';
import type { BuildingType, Resources } from '../types';

interface BuildingSelectorProps {
  selectedBuilding: BuildingType | null;
  onSelectBuilding: (building: BuildingType) => void;
  resources: Resources;
}

export const BuildingSelector: React.FC<BuildingSelectorProps> = ({
  selectedBuilding,
  onSelectBuilding,
  resources
}) => {
  const canAfford = (buildingType: BuildingType): boolean => {
    const building = BUILDINGS[buildingType];
    return Object.entries(building.cost).every(([resource, cost]) => 
      resources[resource as keyof Resources] >= cost
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Buildings</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(BUILDINGS).map(([key, building]) => (
          <BuildingCard
            key={key}
            buildingKey={key as BuildingType}
            building={building}
            isSelected={selectedBuilding === key}
            canAfford={canAfford(key as BuildingType)}
            onSelect={() => onSelectBuilding(key as BuildingType)}
          />
        ))}
      </div>
      
      {selectedBuilding && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-indigo-600">
              {BUILDINGS[selectedBuilding].icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-indigo-900 capitalize">
                {selectedBuilding.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-indigo-700 mb-2">
                {BUILDINGS[selectedBuilding].description}
              </p>
              
              {/* Cost breakdown */}
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(BUILDINGS[selectedBuilding].cost).map(([resource, cost]) => (
                  <span 
                    key={resource}
                    className={`px-2 py-1 rounded ${
                      resources[resource as keyof Resources] >= cost
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {resource}: {cost}
                  </span>
                ))}
              </div>
              
              {/* Special effects */}
              {BUILDINGS[selectedBuilding].specialEffect && (
                <p className="text-xs text-purple-600 mt-2 italic">
                  ✨ {BUILDINGS[selectedBuilding].specialEffect}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};