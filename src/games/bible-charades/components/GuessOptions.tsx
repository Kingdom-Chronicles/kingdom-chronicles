import React from 'react';
import type { BibleStory } from '../types';

interface GuessOptionsProps {
  story: BibleStory;
  onGuess: (guess: string) => void;
  disabled: boolean;
}

export const GuessOptions: React.FC<GuessOptionsProps> = ({ story, onGuess, disabled }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-center mb-6">Choose the Correct Story</h3>
      <div className="grid gap-4">
        {story.options.map((option) => (
          <button
            key={option}
            onClick={() => onGuess(option)}
            disabled={disabled}
            className={`
              w-full p-4 text-lg rounded-lg border-2 transition-all text-left
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-indigo-50 hover:border-indigo-300'}
              ${!disabled && 'hover:shadow-md'}
              border-gray-200
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};