import React from 'react';
import { Heart, Coins, Brain } from 'lucide-react';
import type { PackType } from '../types';

interface PackTypeSelectorProps {
  value: PackType;
  onChange: (value: PackType) => void;
}

export const PackTypeSelector: React.FC<PackTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Bible Pack
      </label>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onChange('healing')}
          className={`
            flex flex-col items-center p-4 rounded-lg border-2 transition-colors
            ${value === 'healing' 
              ? 'bg-pink-50 border-pink-500' 
              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
            }
          `}
        >
          <Heart className="w-8 h-8 text-pink-500 mb-2" />
          <span className={`text-sm font-medium ${
            value === 'healing' ? 'text-pink-900' : 'text-gray-900'
          }`}>Healing</span>
        </button>

        <button
          onClick={() => onChange('wealth')}
          className={`
            flex flex-col items-center p-4 rounded-lg border-2 transition-colors
            ${value === 'wealth' 
              ? 'bg-yellow-50 border-yellow-500' 
              : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
            }
          `}
        >
          <Coins className="w-8 h-8 text-yellow-500 mb-2" />
          <span className={`text-sm font-medium ${
            value === 'wealth' ? 'text-yellow-900' : 'text-gray-900'
          }`}>Wealth</span>
        </button>

        <button
          onClick={() => onChange('wisdom')}
          className={`
            flex flex-col items-center p-4 rounded-lg border-2 transition-colors
            ${value === 'wisdom' 
              ? 'bg-blue-50 border-blue-500' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }
          `}
        >
          <Brain className="w-8 h-8 text-blue-500 mb-2" />
          <span className={`text-sm font-medium ${
            value === 'wisdom' ? 'text-blue-900' : 'text-gray-900'
          }`}>Wisdom</span>
        </button>
      </div>
    </div>
  );
};