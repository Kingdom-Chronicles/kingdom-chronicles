import React, { useState } from 'react';
import { BookOpen, Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings, GameMode } from '../types';
import { ManualModel } from '../../../components/manual/GameManualSetUp';

interface GameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
  const [gameMode, setGameMode] = useState<GameMode>('books');
  const [IsReadingManual, setIsReadingManual] = useState(false);

  const handleStartGame = () => {
    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
      gameMode,
      points: {
        correct: 100,
        timeBonus: 0.5
      }
    };
    onGameStart(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Settings className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Game Setup</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium form-label mb-1">
            Game Mode
          </label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="books">Guess by Bible Books</option>
            <option value="stories">Guess by Bible Stories</option>
          </select>
          <p className="mt-1 text-sm text-theme-secondary">
            {gameMode === 'books' 
              ? 'Identify testaments based on books of the Bible'
              : 'Identify testaments based on Biblical stories'
            }
          </p>
        </div>
        <RoundSelector value={rounds} onChange={setRounds} />
        <TimeSelector value={timePerRound} onChange={setTimePerRound} />
      </div>

      <div className="space-y-3">
        <Button onClick={handleStartGame} className="w-full">
          Start Game
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsReadingManual(true)}
          className="w-full flex items-center justify-center"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Game Instructions
        </Button>
      </div>

      <ManualModel
        isOpen={IsReadingManual}
        onClose={() => setIsReadingManual(false)}
        gameType={'testament-quiz'}
      />
    </div>
  );
};