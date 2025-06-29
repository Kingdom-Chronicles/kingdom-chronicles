import React from 'react';
import { ROUND_COUNTS } from '../constants/gameSettings';

interface RoundSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const RoundSelector: React.FC<RoundSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium form-label mb-1">
        Number of Rounds
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
      >
        {ROUND_COUNTS.map(count => (
          <option key={count} value={count}>{count} Rounds</option>
        ))}
      </select>
    </div>
  );
};