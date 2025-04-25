import React, { useState } from 'react';
import { Settings, Book } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { RoundSelector } from '../../shared/components/RoundSelector';
import { GameMasterToggle } from '../../../components/game/GameMasterToggle';
import { GameManualButton } from '../../../components/game-manual/GameManualButton';
import { PackTypeSelector } from './PackTypeSelector';
import { DifficultySelector } from './DifficultySelector';
import { BibleVersionSelector } from './BibleVersionSelector';
import { ScriptureReadingModal } from './ScriptureReadingModal';
import { DEFAULT_SETTINGS } from '../../shared/constants/gameSettings';
import type { GameSettings, PackType, DifficultyLevel, BibleVersion } from '../types';

interface GameSetupProps {
  onGameStart: (settings: GameSettings) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [rounds, setRounds] = useState(DEFAULT_SETTINGS.rounds);
  const [timePerRound, setTimePerRound] = useState(DEFAULT_SETTINGS.timePerRound);
  const [packType, setPackType] = useState<PackType>('healing');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [bibleVersion, setBibleVersion] = useState<BibleVersion>('NKJV');
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [isGameMaster, setIsGameMaster] = useState(false);

  const handleStartGame = () => {
    const settings: GameSettings = {
      totalRounds: rounds,
      timePerRound,
      packType,
      difficulty,
      maxAttempts,
      bibleVersion,
      isGameMaster,
      points: {
        correct: 100,
        timeBonus: 0.5
      }
    };
    onGameStart(settings);
  };

  return (
    <div className="card p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Settings className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-theme-primary">Game Setup</h2>
      
      <div className="space-y-6 mb-6">
        <PackTypeSelector value={packType} onChange={setPackType} />
        <BibleVersionSelector value={bibleVersion} onChange={setBibleVersion} />
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
        <RoundSelector value={rounds} onChange={setRounds} />
        
        <div>
          <label className="block text-sm font-medium form-label mb-1">
            Time per Round
          </label>
          <select
            value={timePerRound}
            onChange={(e) => setTimePerRound(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={60}>1 Minute</option>
            <option value={180}>3 Minutes</option>
            <option value={300}>5 Minutes</option>
            <option value={420}>7 Minutes</option>
            <option value={600}>10 Minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium form-label mb-1">
            Attempts per Question
          </label>
          <select
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Attempt' : 'Attempts'}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <GameMasterToggle isGameMaster={isGameMaster} onToggle={setIsGameMaster} />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Button onClick={handleStartGame} className="w-full">
          Start Game
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setIsReadingModalOpen(true)}
          className="w-full flex items-center justify-center"
        >
          <Book className="w-4 h-4 mr-2" />
          Read Scriptures
        </Button>
        <GameManualButton gameId="scripture-sprint" />
      </div>

      <ScriptureReadingModal
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
        selectedPack={packType}
      />
    </div>
  );
};