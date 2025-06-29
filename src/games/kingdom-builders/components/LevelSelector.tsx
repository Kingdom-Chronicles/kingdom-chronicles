import React from 'react';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { StoryLevel } from '../types';
import { STORY_LEVELS } from '../constants/stories';

interface LevelSelectorProps {
  unlockedLevels: StoryLevel[];
  currentLevel: StoryLevel;
  onLevelSelect: (level: StoryLevel) => void;
  onBack: () => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  unlockedLevels,
  currentLevel,
  onLevelSelect,
  onBack
}) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full">
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <h2 className="text-2xl font-bold text-gray-900 ml-4">
          Select a Level
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((level) => {
          const isUnlocked = unlockedLevels.includes(level as StoryLevel);
          const isActive = currentLevel === level;
          const levelData = STORY_LEVELS[level as keyof typeof STORY_LEVELS];
          
          return (
            <button
              key={level}
              onClick={() => isUnlocked && onLevelSelect(level as StoryLevel)}
              disabled={!isUnlocked}
              className={`
                p-4 rounded-lg border-2 transition-all text-left
                ${isUnlocked 
                  ? isActive
                    ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200'
                    : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                }
              `}
            >
              <div className="flex items-center mb-2">
                <div className="text-3xl mr-3">{levelData.emoji}</div>
                <div>
                  <div className="font-semibold text-gray-900">Level {level}</div>
                  <div className="text-sm text-gray-500">{isUnlocked ? 'Unlocked' : 'Locked'}</div>
                </div>
              </div>
              
              <div className="font-medium text-gray-800 mb-1">{levelData.title}</div>
              <div className="text-sm text-gray-600 mb-3">{levelData.description}</div>
              
              <div className="flex justify-end">
                {isUnlocked ? (
                  <div className="flex items-center text-xs font-medium text-indigo-600">
                    <Play className="w-3 h-3 mr-1" />
                    {isActive ? 'Continue' : 'Play'}
                  </div>
                ) : (
                  <div className="text-xs font-medium text-gray-500">
                    🔒 Complete previous level
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Complete each level to unlock the next one!
      </div>
    </div>
  );
};