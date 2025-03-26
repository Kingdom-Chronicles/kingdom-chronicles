import React from 'react';
import { Coins, Trophy } from 'lucide-react';
import type { ResourceState } from '../types';

interface GameStatsProps {
  resources: ResourceState[];
  score: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ resources, score }) => {
  const totalResources = resources.reduce((sum, resource) => sum + resource.collected, 0);

  return (
    <div className="flex justify-center space-x-4 mb-6">
      <div className="stats-container flex items-center">
        <Coins className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="font-semibold">Resources: {totalResources}</span>
      </div>
      <div className="stats-container flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-indigo-500" />
        <span className="font-semibold">Score: {score}</span>
      </div>
    </div>
  );
};