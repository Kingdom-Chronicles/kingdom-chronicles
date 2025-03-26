import React from 'react';
import { Timer } from 'lucide-react';

interface RoundTimerProps {
  timeLeft: number;
}

export const RoundTimer: React.FC<RoundTimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 text-xl font-bold">
      <Timer className="w-6 h-6" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};