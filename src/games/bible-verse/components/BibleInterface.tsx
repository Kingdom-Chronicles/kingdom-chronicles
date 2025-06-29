import React from 'react';
import type { BibleVerse } from '../types';

interface BibleInterfaceProps {
  onVerseSelect: (verse: string) => void;
  selectedVerse: string | null;
  targetVerse: BibleVerse;
  disabled?: boolean;
  isGameMaster?: boolean;
}

export const BibleInterface: React.FC<BibleInterfaceProps> = ({
  onVerseSelect,
  selectedVerse,
  targetVerse,
  disabled,
  isGameMaster
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {isGameMaster && (
        <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-amber-800 font-medium">
            Correct Answer: {targetVerse.reference}
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {targetVerse.options.map((option) => (
          <button
            key={option}
            onClick={() => onVerseSelect(option)}
            disabled={disabled || selectedVerse !== null}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-indigo-50'}
              ${selectedVerse === option 
                ? selectedVerse === targetVerse.reference
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-200'
              }
              ${isGameMaster && option === targetVerse.reference ? 'ring-2 ring-amber-500' : ''}
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-6 h-6 rounded-full border-2 flex-shrink-0 mr-3
                ${selectedVerse === option
                  ? selectedVerse === targetVerse.reference
                    ? 'border-green-500 bg-green-500'
                    : 'border-red-500 bg-red-500'
                  : 'border-gray-300'
                }
              `} />
              <span className="text-lg">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedVerse && (
        <div className={`mt-4 p-4 rounded-lg text-center ${
          selectedVerse === targetVerse.reference
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {selectedVerse === targetVerse.reference
            ? 'Correct! Well done!'
            : 'Try again with the next verse!'}
        </div>
      )}
    </div>
  );
};