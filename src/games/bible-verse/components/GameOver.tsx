import React from 'react';
import { Trophy, RotateCcw, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { RoundScore } from '../types';

interface GameOverProps {
  scores: RoundScore[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ scores, onPlayAgain, onExit }) => {
  const totalScore = scores.reduce((sum, score) => sum + score.points, 0);
  const totalVerses = scores.reduce((sum, score) => sum + score.versesFound, 0);

  return (
    <div className="bg-theme-bg rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>

      <h2 className="text-3xl font-bold text-center mb-6 text-theme-primary">Game Complete!</h2>

      <div className="space-y-6 mb-8">
        <div className="bg-theme-card p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 text-theme-primary">Final Score: {totalScore}</h3>
          <p className="text-green-500">Total Verses Found: {totalVerses}</p>
        </div>

        {scores.map((score, roundIndex) => (
          <div key={roundIndex} className="bg-theme-card p-6 rounded-lg">
            <h4 className="font-medium text-lg mb-4 text-theme-primary">Round {roundIndex + 1}</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-theme-primary">Score: {score.points}</p>
                <p className="text-green-500">Verses Found: {score.versesFound}</p>
                <p className="text-indigo-500">Time Bonus: {score.timeBonus}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-theme-primary">Verses:</h5>
              {score.attempts.map((attempt, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${
                    attempt.isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'
                  }`}
                >
                  <div className="flex items-start">
                    <div>
                      <p className="font-medium mb-2 text-theme-primary">{attempt.verseText}</p>
                      <div className="text-sm">
                        <p>
                          <span className="font-medium text-theme-secondary">Correct Reference:</span>{' '}
                          <span className="text-green-500">{attempt.correctReference}</span>
                        </p>
                        <p>
                          <span className="font-medium text-theme-secondary">Your Answer:</span>{' '}
                          <span className={attempt.isCorrect ? 'text-green-500' : 'text-red-500'}>
                            {attempt.userAnswer || 'Skipped'}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <Button onClick={onPlayAgain} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Button onClick={onExit} variant="outline" className="flex-1">
          <X className="w-4 h-4 mr-2" />
          Exit
        </Button>
      </div>
    </div>
  );
};