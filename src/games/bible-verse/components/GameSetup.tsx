import React, { useState } from 'react';
import { BookOpen, Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings } from '../types';
import { ManualModel } from './bibleversemanualmodel';

interface GameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
   const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);

  const handleStartGame = () => {
    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
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
      </div>

      <Button onClick={handleStartGame} className="w-full mb-4">
        Start Game
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => setIsReadingModalOpen(true)}
        className="w-full flex items-center justify-center"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Game Instructions
      </Button>

          <ManualModel
            isOpen={isReadingModalOpen}
            onClose={() => setIsReadingModalOpen(false)}
            />
    </div>
  );
};