import React from 'react';
import { TreePine, Mountain, Wheat, Heart } from 'lucide-react';
import type { Resources } from '../types';

interface ResourceDisplayProps {
  resources: Resources;
  turn: number;
  maxTurns: number;
}

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources, turn, maxTurns }) => {
  const resourceIcons = {
    wood: <TreePine className="w-5 h-5 text-green-600" />,
    stone: <Mountain className="w-5 h-5 text-gray-600" />,
    food: <Wheat className="w-5 h-5 text-yellow-600" />,
    faith: <Heart className="w-5 h-5 text-purple-600" />
  };

  const resourceColors = {
    wood: 'bg-green-50 border-green-200',
    stone: 'bg-gray-50 border-gray-200',
    food: 'bg-yellow-50 border-yellow-200',
    faith: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Kingdom Resources</h3>
        <div className="text-sm text-gray-600">
          Turn {turn} of {maxTurns}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(resources).map(([resource, amount]) => (
          <div 
            key={resource}
            className={`p-3 rounded-lg border ${resourceColors[resource as keyof Resources]}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {resourceIcons[resource as keyof Resources]}
                <span className="font-medium capitalize">{resource}</span>
              </div>
              <span className="text-xl font-bold">{amount}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Resource generation preview */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-800">
          <span className="font-medium">Next turn generation:</span>
          <span className="ml-2">
            +2 Wood, +1 Stone, +3 Food, +1 Faith (plus building bonuses)
          </span>
        </div>
      </div>
    </div>
  );
};