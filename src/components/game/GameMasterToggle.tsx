import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from '../ui/Button';

interface GameMasterToggleProps {
  isGameMaster: boolean;
  onToggle: (value: boolean) => void;
}

export const GameMasterToggle: React.FC<GameMasterToggleProps> = ({ isGameMaster, onToggle }) => {
  return (
    <Button
      variant="outline"
      onClick={() => onToggle(!isGameMaster)}
      className={`flex items-center space-x-2 ${
        isGameMaster ? 'bg-amber-50 border-amber-500 text-amber-700' : ''
      }`}
    >
      <Crown className={`w-4 h-4 ${isGameMaster ? 'text-amber-500' : ''}`} />
      <span>{isGameMaster ? 'Game Master Mode' : 'Play as Game Master'}</span>
    </Button>
  );
};