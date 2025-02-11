import React, { useEffect, useCallback } from 'react';
import { Ship } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { useRoundManager } from '../shared/hooks/useRoundManager';
import { useGameScore } from '../../hooks/useGameScore';
import { RoundTimer } from '../../components/game/RoundTimer';
import { ArkGameSetup } from './components/ArkGameSetup';
import { ResourceList } from './components/ResourceList';
import { GameStats } from './components/GameStats';
import type { GameSettings } from './types';
import { analyticsService } from '../../services/analytics/analyticsService';

export const ArkEscape: React.FC = () => {
  const {
    resources,
    collectResource,
    calculateScore,
    resetGame
  } = useGameState();

  const {
    currentRound,
    timeLeft,
    isPlaying,
    settings,
    startGame,
    endRound,
    decrementTime,
    getTotalScore
  } = useRoundManager();

  const { handleScoreUpdate } = useGameScore('ark-escape');

  const handleRoundEnd = useCallback(() => {
    const score = calculateScore(timeLeft);
    const duration = settings?.timePerRound ? settings.timePerRound - timeLeft : 0;
    analyticsService.trackGameEnd('ark-escape', score.points, duration);
    
    handleScoreUpdate(score.points);
    endRound(score);
    resetGame();
  }, [calculateScore, handleScoreUpdate, endRound, resetGame, settings?.timePerRound, timeLeft]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    const timer = setInterval(decrementTime, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, decrementTime]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      handleRoundEnd();
    }
  }, [isPlaying, timeLeft, handleRoundEnd]);

  const handleGameStart = useCallback((gameSettings: GameSettings) => {
    analyticsService.trackGameStart('ark-escape', gameSettings);
    resetGame();
    startGame(gameSettings);
  }, [resetGame, startGame]);

  return (
    <div className="theme-base theme-ark-escape min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="content-container">
          {!isPlaying || !settings ? (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Ark Escape</h1>
              <p className="text-gray-600 mb-4">Race against time to gather resources and build Noah's ark</p>
              <ArkGameSetup onGameStart={handleGameStart} />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
                <RoundTimer timeLeft={timeLeft} />
              </div>

              <div className="game-interface">
                <GameStats resources={resources} score={getTotalScore()} />
                <ResourceList
                  resources={resources}
                  onCollect={collectResource}
                  disabled={timeLeft === 0}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};