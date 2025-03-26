import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md p-4">
      <TimerIcon className="w-6 h-6 mr-2 text-indigo-600" />
      <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
    </div>
  );
};