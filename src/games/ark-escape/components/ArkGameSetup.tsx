import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { GameSetup } from '../../shared/components/GameSetup';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings } from '../types';
import { BookOpen } from 'lucide-react';
import { ManualModel } from './arkescapemanualmodel';

interface ArkGameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const ArkGameSetup: React.FC<ArkGameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
   const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);

  const handleStartGame = () => {
    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
      points: {
        resourceCompletion: 100,
        timeBonus: 0.5,
        perfectRound: 200
      }
    };
    onGameStart(settings);
  };

  return (
    <GameSetup
      title="Ark Escape"
      description="Gather resources before the flood! Build the ark in time to save the animals."
    >
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
              View Manual
            </Button>

             <ManualModel
                    isOpen={isReadingModalOpen}
                    onClose={() => setIsReadingModalOpen(false)}
                  />
    </GameSetup>
  );
};