import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { GameManualModal } from './GameManualModal';
import { gameManuals } from './constants/gameManual';

interface GameManualButtonProps {
  gameId: string;
}

export const GameManualButton: React.FC<GameManualButtonProps> = ({ gameId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const manual = gameManuals[gameId];

  if (!manual) return null;

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center w-full"
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        How to Play
      </Button>

      <GameManualModal
        manual={manual}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};