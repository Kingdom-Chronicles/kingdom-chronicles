import React from 'react';
import { Trophy, Target, Zap, Award } from 'lucide-react';
import type { Resources } from '../types';

interface GameStatsProps {
  resources: Resources;
  score: number;
  buildings: number;
  achievements: any[];
}

export const GameStats: React.FC<GameStatsProps> = ({ resources, score, buildings, achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Kingdom Status</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <Trophy className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
          <div className="text-2xl font-bold text-indigo-900">{score}</div>
          <div className="text-sm text-indigo-600">Score</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-900">{buildings}</div>
          <div className="text-sm text-green-600">Buildings</div>
        </div>
        
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
          <div className="text-2xl font-bold text-yellow-900">
            {Object.values(resources).reduce((sum, val) => sum + val, 0)}
          </div>
          <div className="text-sm text-yellow-600">Total Resources</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <Award className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-purple-900">{unlockedAchievements}</div>
          <div className="text-sm text-purple-600">Achievements</div>
        </div>
      </div>
    </div>
  );
};