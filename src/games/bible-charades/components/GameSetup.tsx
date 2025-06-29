import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { TimeSelector } from '../../shared/components/TimeSelector';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { GameManualButton } from '../../../components/game-manual/GameManualButton';
import { StoryModeSelector } from './StoryModeSelector';
import { DifficultySelector } from './DifficultySelector';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { Team, GameSettings, StoryGenerationMode, GameDifficulty } from '../types';

interface GameSetupProps {
  onGameStart: (teams: Team[], settings: GameSettings) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
  const [storyMode, setStoryMode] = useState<StoryGenerationMode>('static');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('medium');

  const handleStartGame = () => {
    const teams: Team[] = [
      { id: '1', name: team1Name, score: 0, isActing: true },
      { id: '2', name: team2Name, score: 0, isActing: false }
    ];

    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
      storyMode,
      difficulty,
      points: {
        correct: 100,
        timeBonus: 10
      }
    };

    onGameStart(teams, settings);
  };

  return (
    <div className="card p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Settings className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-theme-primary">Game Setup</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium form-label mb-1">
            Team 1 Name
          </label>
          <input
            type="text"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium form-label mb-1">
            Team 2 Name
          </label>
          <input
            type="text"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <StoryModeSelector value={storyMode} onChange={setStoryMode} />
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
        <RoundSelector value={rounds} onChange={setRounds} />
        <TimeSelector value={timePerRound} onChange={setTimePerRound} />
      </div>

      <div className="space-y-4">
        <Button onClick={handleStartGame} className="w-full">
          Start Game
        </Button>
        <GameManualButton gameId="bible-charades" />
      </div>
    </div>
  );
};