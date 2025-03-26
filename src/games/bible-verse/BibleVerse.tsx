import React, { useEffect, useCallback } from 'react';
import { Book } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { useRoundManager } from '../shared/hooks/useRoundManager';
import { useGameScore } from '../../hooks/useGameScore';
import { RoundTimer } from '../../components/game/RoundTimer';
import { GameSetup } from './components/GameSetup';
import { VerseDisplay } from './components/VerseDisplay';
import { BibleInterface } from './components/BibleInterface';
import { GameOver } from './components/GameOver';
import { MobileGameHeader } from '../../components/layout/MobileGameHeader';
import type { GameSettings } from './types';
import { analyticsService } from '../../services/analytics/analyticsService';
import confetti from 'canvas-confetti';

export const BibleVerse: React.FC = () => {
  const {
    currentVerse,
    selectedVerse,
    setSelectedVerse,
    calculateScore,
    resetGame,
    versesFound
  } = useGameState();

  const {
    currentRound,
    timeLeft,
    isPlaying,
    settings,
    startGame,
    endRound,
    decrementTime,
    getTotalScore,
    roundScores
  } = useRoundManager();

  const { handleScoreUpdate } = useGameScore('bible-verse');

  const handleRoundEnd = useCallback(() => {
    if (!settings) return;
    
    const score = calculateScore(timeLeft);
    const duration = settings.timePerRound - timeLeft;
    analyticsService.trackGameEnd('bible-verse', score.points, duration);
    
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
    analyticsService.trackGameStart('bible-verse', gameSettings);
    resetGame();
    startGame(gameSettings);
  }, [resetGame, startGame]);

  const handleVerseSelect = useCallback((verse: string) => {
    if (!isPlaying || timeLeft <= 0 || !currentVerse) return;
    
    const isCorrect = verse === currentVerse.reference;
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    setSelectedVerse(verse);
  }, [isPlaying, timeLeft, currentVerse, setSelectedVerse]);

  // Show game over screen if we've completed all rounds
  if (settings && currentRound > settings.totalRounds) {
    return (
      <GameOver 
        scores={roundScores}
        onPlayAgain={() => {
          resetGame();
          handleGameStart(settings);
        }}
        onExit={() => window.location.href = '/games'}
      />
    );
  }

  return (
    <div className="theme-base theme-bible-verse min-h-screen">
      <MobileGameHeader title="Bible Verse" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="content-container">
          {!isPlaying || !settings ? (
            <div className="max-w-4xl mx-auto p-4">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Find the Bible Verse</h1>
                <p className="text-gray-600">Race against time to locate Bible verses!</p>
              </div>
              <GameSetup onGameStart={handleGameStart} />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
                <RoundTimer timeLeft={timeLeft} />
                <div className="mt-2">
                  <span className="font-semibold">Verses Found: </span>
                  <span className="text-green-600">{versesFound}</span>
                  <span className="mx-2">|</span>
                  <span className="font-semibold">Score: </span>
                  <span className="text-indigo-600">{getTotalScore()}</span>
                </div>
              </div>

              <div className="game-interface">
                <VerseDisplay verse={currentVerse} />
                <BibleInterface
                  onVerseSelect={handleVerseSelect}
                  selectedVerse={selectedVerse}
                  targetVerse={currentVerse}
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