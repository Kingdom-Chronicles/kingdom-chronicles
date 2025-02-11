import React from 'react';
import { Dumbbell } from 'lucide-react';
import type { DifficultyLevel } from '../types';

interface DifficultySelectorProps {
  value: DifficultyLevel;
  onChange: (difficulty: DifficultyLevel) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium form-label mb-1">
        Select Difficulty
      </label>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onChange('easy')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors card ${
            value === 'easy' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-200'
          }`}
        >
          <Dumbbell className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-sm font-medium text-theme-primary">Easy</span>
          <span className="text-xs text-theme-secondary">4 words shown</span>
        </button>

        <button
          onClick={() => onChange('medium')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors card ${
            value === 'medium' 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-gray-200 hover:border-yellow-200'
          }`}
        >
          <Dumbbell className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-sm font-medium text-theme-primary">Medium</span>
          <span className="text-xs text-theme-secondary">3 words shown</span>
        </button>

        <button
          onClick={() => onChange('hard')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors card ${
            value === 'hard' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-200 hover:border-red-200'
          }`}
        >
          <Dumbbell className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-sm font-medium text-theme-primary">Hard</span>
          <span className="text-xs text-theme-secondary">No words shown</span>
        </button>
      </div>
    </div>
  );
};