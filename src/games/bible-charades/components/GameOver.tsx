import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { Team } from '../types';

interface GameOverProps {
  teams: Team[];
  onPlayAgain: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ teams, onPlayAgain }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  const isDraw = sortedTeams[0].score === sortedTeams[1].score;

  return (
    <div className="bg-theme-bg rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>

      <h2 className="text-3xl font-bold text-center mb-6 text-theme-primary">
        {isDraw ? "It's a Draw!" : `${winner.name} Wins!`}
      </h2>

      <div className="space-y-4 mb-8">
        {sortedTeams.map((team) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-4 bg-theme-card rounded-lg"
          >
            <span className="font-semibold text-theme-primary">{team.name}</span>
            <span className="text-lg text-theme-primary">{team.score} points</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onPlayAgain}
        className="w-full flex items-center justify-center"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Play Again
      </Button>
    </div>
  );
};