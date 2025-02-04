import React from 'react';
import { Coins, Trophy } from 'lucide-react';

interface GameStatsProps {
  resources: number;
  score: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ resources, score }) => {
  return (
    <div className="flex justify-center space-x-4">
      <div className="bg-white p-3 rounded-lg shadow flex items-center">
        <Coins className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="font-semibold">Resources: {resources}</span>
      </div>
      <div className="bg-white p-3 rounded-lg shadow flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-indigo-500" />
        <span className="font-semibold">Score: {score}</span>
      </div>
    </div>
  );
};