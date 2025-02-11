import React from 'react';
import { Scroll, BookOpen } from 'lucide-react';
import type { Testament } from '../types';

interface TestamentSelectorProps {
  onSelect: (testament: Testament) => void;
  lastGuessCorrect: boolean | null;
  disabled?: boolean;
}

export const TestamentSelector: React.FC<TestamentSelectorProps> = ({ 
  onSelect, 
  lastGuessCorrect,
  disabled 
}) => {
  return (
    <div className="space-y-4">
      {lastGuessCorrect !== null && (
        <div className={`text-center p-4 rounded-lg mb-4 ${
          lastGuessCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {lastGuessCorrect ? 'Correct!' : 'Wrong! -50 points'}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('old')}
          disabled={disabled}
          className={`testament-button old flex flex-col items-center p-6 rounded-lg border-2 transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
          }`}
        >
          <Scroll className="w-12 h-12 mb-2" />
          <span className="text-lg font-semibold">Old Testament</span>
        </button>

        <button
          onClick={() => onSelect('new')}
          disabled={disabled}
          className={`testament-button new flex flex-col items-center p-6 rounded-lg border-2 transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
          }`}
        >
          <BookOpen className="w-12 h-12 mb-2" />
          <span className="text-lg font-semibold">New Testament</span>
        </button>
      </div>
    </div>
  );
};