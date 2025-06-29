import React, { useState } from 'react';
import { Crown, Book, Star, Layers } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { GameManualButton } from '../../../components/game-manual/GameManualButton';
import type { StoryLevel } from '../types';

interface GameSetupProps {
  onGameStart: () => void;
  onShowLevelSelector: () => void;
  unlockedLevels: StoryLevel[];
}

export const GameSetup: React.FC<GameSetupProps> = ({ 
  onGameStart, 
  onShowLevelSelector,
  unlockedLevels
}) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  const hasProgress = unlockedLevels.length > 1;

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Bible Story Adventures</h2>
        <p className="text-lg text-gray-600 mb-6">
          Join 5 amazing Bible stories and learn about God's love through interactive adventures!
        </p>
      </div>

      {/* Story Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🌍</span>
            <h3 className="font-semibold text-gray-800">Creation</h3>
          </div>
          <p className="text-sm text-gray-600">Help God create the world in 7 days!</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🚢</span>
            <h3 className="font-semibold text-gray-800">Noah's Ark</h3>
          </div>
          <p className="text-sm text-gray-600">Build the ark and save the animals!</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🏹</span>
            <h3 className="font-semibold text-gray-800">David & Goliath</h3>
          </div>
          <p className="text-sm text-gray-600">Help David defeat the giant with faith!</p>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Game Difficulty
        </h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <button
            onClick={() => setDifficulty('easy')}
            className={`p-4 rounded-lg border-2 transition-all ${
              difficulty === 'easy'
                ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <div className="text-xl mb-2">😊</div>
            <div className="font-medium text-gray-900">Easy</div>
            <div className="text-xs text-gray-500">More time, helpful hints</div>
          </button>
          
          <button
            onClick={() => setDifficulty('medium')}
            className={`p-4 rounded-lg border-2 transition-all ${
              difficulty === 'medium'
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="text-xl mb-2">🙂</div>
            <div className="font-medium text-gray-900">Medium</div>
            <div className="text-xs text-gray-500">Balanced challenge</div>
          </button>
          
          <button
            onClick={() => setDifficulty('hard')}
            className={`p-4 rounded-lg border-2 transition-all ${
              difficulty === 'hard'
                ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <div className="text-xl mb-2">😮</div>
            <div className="font-medium text-gray-900">Hard</div>
            <div className="text-xs text-gray-500">Less time, more challenge</div>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <Button onClick={onGameStart} className="w-full text-lg py-4">
          <Book className="w-5 h-5 mr-2" />
          {hasProgress ? 'Continue Adventure' : 'Start Bible Adventures'}
        </Button>
        
        {hasProgress && (
          <Button 
            onClick={onShowLevelSelector} 
            variant="outline" 
            className="w-full"
          >
            <Layers className="w-5 h-5 mr-2" />
            Select Level
          </Button>
        )}
        
        <GameManualButton gameId="kingdom-builders" />
      </div>
    </div>
  );
};