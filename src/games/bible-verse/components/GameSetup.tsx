import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { GameMasterToggle } from '../../../components/game/GameMasterToggle';
import { GameManualButton } from '../../../components/game-manual/GameManualButton';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings } from '../types';

interface GameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
  const [isGameMaster, setIsGameMaster] = useState(false);

  const handleStartGame = () => {
    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
      isGameMaster,
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
        <RoundSelector value={rounds} onChange={setRounds} />
        <TimeSelector value={timePerRound} onChange={setTimePerRound} />
        <div className="flex justify-center">
          <GameMasterToggle isGameMaster={isGameMaster} onToggle={setIsGameMaster} />
        </div>
      </div>

      <div className="space-y-4">
        <Button onClick={handleStartGame} className="w-full">
          Start Game
        </Button>
        <GameManualButton gameId="bible-verse" />
      </div>
    </div>
  );
};