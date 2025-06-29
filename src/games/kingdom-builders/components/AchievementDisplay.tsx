import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementDisplayProps {
  achievements: Achievement[];
}

export const AchievementDisplay: React.FC<AchievementDisplayProps> = ({ achievements }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Achievements ({unlockedCount}/{achievements.length})</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border ${
                achievement.unlocked
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  achievement.unlocked ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span className={`font-medium ${
                  achievement.unlocked ? 'text-green-900' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                achievement.unlocked ? 'text-green-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};