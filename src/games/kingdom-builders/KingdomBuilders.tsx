import React, { useEffect, useCallback } from 'react';
import { BuildingSelector } from './components/BuildingSelector';
import { GameGrid } from './components/GameGrid';
import { GameStats } from './components/GameStats';
import { GameSetup } from './components/GameSetup';
import { MobileGameHeader } from '../../components/layout/MobileGameHeader';
import { useGameState } from './hooks/useGameState';
import { useRoundManager } from './hooks/useRoundManager';
import { useGameScore } from '../../hooks/useGameScore';
import { RoundTimer } from '../../components/game/RoundTimer';
import type { GameSettings } from './types';
import { analyticsService } from '../../services/analytics/analyticsService';

export const KingdomBuilders: React.FC = () => {
  const {
    resources,
    grid,
    selectedBuilding,
    setSelectedBuilding,
    handleCellClick,
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

  const { handleScoreUpdate } = useGameScore('kingdom-builders');

  const handleRoundEnd = useCallback(() => {
    const score = calculateScore();
    const duration = settings?.timePerRound ? settings.timePerRound - timeLeft : 0;
    // Track game analytics
    analyticsService.trackGameEnd('kingdom-builders', score.points, duration);
    
    handleScoreUpdate(score.points);
    endRound(score);
    resetGame();
  }, [calculateScore, handleScoreUpdate, endRound, resetGame,settings?.timePerRound,timeLeft]);

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
    analyticsService.trackGameStart('kingdom-builders', gameSettings);
    resetGame();
    startGame(gameSettings);
  }, [resetGame, startGame]);

  return (
    <div className="theme-base theme-kingdom-builders min-h-screen">
      <MobileGameHeader title="Kingdom Builders" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="content-container">
          {!isPlaying || !settings ? (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Kingdom Builders</h1>
              <p className="text-gray-600 mb-4">Build your kingdom wisely and manage your resources</p>
              <GameSetup onGameStart={handleGameStart} />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
                <RoundTimer timeLeft={timeLeft} />
              </div>

              <div className="game-interface">
                <GameStats resources={resources} score={getTotalScore()} />
                <BuildingSelector
                  selectedBuilding={selectedBuilding}
                  onSelectBuilding={setSelectedBuilding}
                />
                <GameGrid grid={grid} onCellClick={handleCellClick} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};