import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { GameSetup } from '../../shared/components/GameSetup';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings } from '../types';

interface ArkGameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const ArkGameSetup: React.FC<ArkGameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);

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

      <Button onClick={handleStartGame} className="w-full">
        Start Game
      </Button>
    </GameSetup>
  );
};