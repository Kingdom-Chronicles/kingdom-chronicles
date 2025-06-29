import React from 'react';
import { ArrowRight, RotateCcw, Home } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface ResultModalProps {
  isCorrect: boolean;
  message: string;
  isLastLevel: boolean;
  gameCompleted: boolean;
  onNextLevel: () => void;
  onTryAgain: () => void;
  onExitToMenu: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isCorrect,
  message,
  isLastLevel,
  gameCompleted,
  onNextLevel,
  onTryAgain,
  onExitToMenu
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {isCorrect ? (
            <div className="text-6xl mb-4">🎉</div>
          ) : (
            <div className="text-6xl mb-4">😅</div>
          )}
          
          <h2 className={`text-2xl font-bold mb-2 ${
            isCorrect ? 'text-green-600' : 'text-orange-600'
          }`}>
            {isCorrect ? 'Well Done!' : 'Try Again!'}
          </h2>
          
          <p className="text-gray-700">{message}</p>
        </div>

        {gameCompleted ? (
          <div className="space-y-4">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                🛠️ New stories and levels are coming soon!
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                📦 Stay tuned and keep building with kindness!
              </p>
            </div>
            <Button
              onClick={onExitToMenu}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Menu</span>
            </Button>
          </div>
        ) : isCorrect ? (
          <div className="space-y-4">
            {!isLastLevel ? (
              <Button
                onClick={onNextLevel}
                className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Next Level</span>
              </Button>
            ) : (
              <Button
                onClick={onExitToMenu}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to Menu</span>
              </Button>
            )}
            <Button
              onClick={onExitToMenu}
              variant="outline"
              className="w-full"
            >
              Back to Menu
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={onTryAgain}
              className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
            <Button
              onClick={onExitToMenu}
              variant="outline"
              className="w-full"
            >
              Back to Menu
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};