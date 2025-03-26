import React, { useEffect, useCallback } from 'react';
import { useGameState } from './hooks/useGameState';
import { useRoundManager } from '../shared/hooks/useRoundManager';
import { useGameScore } from '../../hooks/useGameScore';
import { RoundTimer } from '../../components/game/RoundTimer';
import { GameSetup } from './components/GameSetup';
import { VerseDisplay } from './components/VerseDisplay';
import { VerseInput } from './components/VerseInput';
import { GameSummary } from './components/GameSummary';
import type { GameSettings } from './types';
import { analyticsService } from '../../services/analytics/analyticsService';
import confetti from 'canvas-confetti';

export const ApMoBiblePack: React.FC = () => {
  const {
    currentVerse,
    versesCompleted,
    feedback,
    failedVerses,
    checkAnswer,
    getNextVerse,
    calculateScore,
    resetGame,
    initializeGame,
    incrementVersesCompleted
  } = useGameState('healing', 'medium', 3);

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

  const { handleScoreUpdate } = useGameScore('scripture-sprint');

  const handleRoundEnd = useCallback(() => {
    if (!settings) return;
    
    const score = calculateScore(timeLeft);
    const duration = settings.timePerRound - timeLeft;
    
    analyticsService.trackGameEnd('scripture-sprint', score.points, duration);
    handleScoreUpdate(score.points);
    endRound(score);
    resetGame();
  }, [calculateScore, handleScoreUpdate, endRound, resetGame, settings, timeLeft]);

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
    analyticsService.trackGameStart('scripture-sprint', gameSettings);
    initializeGame(gameSettings.packType, gameSettings.difficulty, gameSettings.maxAttempts);
    startGame(gameSettings);
  }, [initializeGame, startGame]);

  const handleAnswerSubmit = useCallback((answer: string | null) => {
    const result = checkAnswer(answer);
    
    if (result.isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      incrementVersesCompleted();
      setTimeout(() => {
        getNextVerse();
      }, 1500);
    }
  }, [checkAnswer, incrementVersesCompleted, getNextVerse]);

  if (!isPlaying || !settings) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Ap Mo' Bible Pack</h1>
          <p className="text-gray-600">Complete the verses before time runs out!</p>
        </div>
        <GameSetup onGameStart={handleGameStart} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
        <RoundTimer timeLeft={timeLeft} />
        <div className="mt-2">
          <span className="font-semibold">Verses Completed: </span>
          <span className="text-green-600">{versesCompleted}</span>
          <span className="mx-2">|</span>
          <span className="font-semibold">Score: </span>
          <span className="text-indigo-600">{getTotalScore()}</span>
        </div>
      </div>

      <VerseDisplay 
        verse={currentVerse}
        feedback={feedback}
        difficulty={settings.difficulty}
      />
      
      <VerseInput
        onSubmit={handleAnswerSubmit}
        disabled={timeLeft === 0}
        attemptsLeft={feedback?.attemptsLeft}
      />

      {timeLeft === 0 && (
        <GameSummary 
          failedVerses={failedVerses}
          onPlayAgain={() => resetGame()}
          onExit={() => window.location.href = '/games'}
        />
      )}
    </div>
  );
};

export default ApMoBiblePack;