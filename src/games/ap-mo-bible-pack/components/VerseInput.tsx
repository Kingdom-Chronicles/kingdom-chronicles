import React, { useState } from 'react';
import { SkipForward } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface VerseInputProps {
  onSubmit: (answer: string | null) => void;
  disabled?: boolean;
  attemptsLeft?: number;
}

export const VerseInput: React.FC<VerseInputProps> = ({ 
  onSubmit, 
  disabled,
  attemptsLeft
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || attemptsLeft === 0) return;
    onSubmit(input);
    setInput('');
  };

  const handleSkip = () => {
    onSubmit(null);
    setInput('');
  };

  const isDisabled = disabled || attemptsLeft === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isDisabled}
          placeholder={isDisabled ? 'No more attempts remaining' : 'Type the entire verse...'}
          className={`w-full p-4 border-2 rounded-lg form-input focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none h-32 ${
            isDisabled ? 'bg-gray-100 border-gray-200' : ''
          }`}
        />
        {attemptsLeft !== undefined && attemptsLeft > 0 && (
          <p className="mt-2 text-sm text-theme-secondary">
            {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining
          </p>
        )}
      </div>
      <div className="flex space-x-4">
        <Button 
          type="submit" 
          disabled={isDisabled || !input.trim()}
          className="flex-1"
        >
          Submit Answer
        </Button>
        <Button 
          type="button"
          variant="outline"
          onClick={handleSkip}
          disabled={disabled}
          className="flex items-center"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip
        </Button>
      </div>
    </form>
  );
};