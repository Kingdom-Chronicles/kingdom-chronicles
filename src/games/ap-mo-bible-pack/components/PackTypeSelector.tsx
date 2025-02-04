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
          className={`pack-button healing flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'healing' ? 'active' : ''
          }`}
        >
          <Heart className="w-8 h-8 text-pink-500 mb-2" />
          <span className="text-sm font-medium">Healing</span>
        </button>

        <button
          onClick={() => onChange('wealth')}
          className={`pack-button wealth flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'wealth' ? 'active' : ''
          }`}
        >
          <Coins className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-sm font-medium">Wealth</span>
        </button>

        <button
          onClick={() => onChange('wisdom')}
          className={`pack-button wisdom flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            value === 'wisdom' ? 'active' : ''
          }`}
        >
          <Brain className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm font-medium">Wisdom</span>
        </button>
      </div>
    </div>
  );
};