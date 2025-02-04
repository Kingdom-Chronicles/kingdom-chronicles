import React from 'react';
import { Button } from '../../../components/ui/Button';
import { RESOURCE_CONFIG } from '../constants/resources';
import type { ResourceState } from '../types';

interface ResourceListProps {
  resources: ResourceState[];
  onCollect: (type: ResourceState['type']) => void;
  disabled?: boolean;
}

export const ResourceList: React.FC<ResourceListProps> = ({ resources, onCollect, disabled }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {resources.map(resource => {
        const config = RESOURCE_CONFIG[resource.type];
        const Icon = config.icon;
        const progress = (resource.collected / resource.required) * 100;

        return (
          <div key={resource.type} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Icon className={`w-6 h-6 text-${config.color}-600`} />
                <span className="ml-2 font-semibold">{config.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {resource.collected}/{resource.required}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className={`bg-${config.color}-600 rounded-full h-2`}
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <Button
              onClick={() => onCollect(resource.type)}
              disabled={disabled || resource.collected >= resource.required}
              className="w-full"
            >
              Collect {config.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
};