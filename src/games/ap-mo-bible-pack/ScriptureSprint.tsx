import React, { useEffect, useCallback, useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { useRoundManager } from '../shared/hooks/useRoundManager';
import { useGameScore } from '../../hooks/useGameScore';
import { useGameProgressStore } from '../../store/useGameProgressStore';
import { RoundTimer } from '../../components/game/RoundTimer';
import { GameSetup } from './components/GameSetup';
import { VerseDisplay } from './components/VerseDisplay';
import { VerseInput } from './components/VerseInput';
import { GameSummary } from './components/GameSummary';
import { MobileGameHeader } from '../../components/layout/MobileGameHeader';
import { StreakDisplay } from './components/StreakDisplay';
import type { GameSettings, VerseAttempt } from './types';
import { analyticsService } from '../../services/analytics/analyticsService';
import confetti from 'canvas-confetti';

export const ScriptureSprint: React.FC = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [allFailedVerses, setAllFailedVerses] = useState<VerseAttempt[]>([]);
  const [inputValue, setInputValue] = useState('');

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
    incrementVersesCompleted,
    getVerseText
  } = useGameState('healing', 'medium', 3, 'NKJV');

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
  
  // Progress tracking
  const { 
    updateLastPlayed, 
    addFailedAnswer, 
    streak,
    syncWithCloud 
  } = useGameProgressStore();

  // Sync with cloud when component mounts (for authenticated users)
  useEffect(() => {
    syncWithCloud();
  }, [syncWithCloud]);

  const handleRoundEnd = useCallback(() => {
    if (!settings) return;
    
    const score = calculateScore(timeLeft);
    const duration = settings.timePerRound - timeLeft;
    
    analyticsService.trackGameEnd('scripture-sprint', score.points, duration);
    handleScoreUpdate(score.points);

    // Track failed answers for reminders
    failedVerses.forEach(attempt => {
      addFailedAnswer({
        gameType: 'scripture-sprint',
        question: `Complete the verse from ${attempt.verse}`,
        correctAnswer: attempt.expectedAnswer,
        userAnswer: attempt.userAnswer || 'No answer provided',
        timestamp: new Date().toISOString()
      });
    });

    setAllFailedVerses(prev => [...prev, ...failedVerses]);

    if (currentRound >= settings.totalRounds) {
      setShowSummary(true);
      // Update last played when game is complete
      updateLastPlayed('scripture-sprint');
    }
    
    endRound(score);
    resetGame();
    setInputValue('');
  }, [calculateScore, handleScoreUpdate, endRound, resetGame, settings, timeLeft, currentRound, failedVerses, addFailedAnswer, updateLastPlayed]);

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
    setShowSummary(false);
    setAllFailedVerses([]);
    setInputValue('');
    analyticsService.trackGameStart('scripture-sprint', gameSettings);
    initializeGame(
      gameSettings.packType, 
      gameSettings.difficulty, 
      gameSettings.maxAttempts,
      gameSettings.bibleVersion
    );
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
        setInputValue('');
      }, 1500);
    } else {
      // Track failed answer immediately when it happens
      if (currentVerse && result.attemptsLeft === 0) {
        addFailedAnswer({
          gameType: 'scripture-sprint',
          question: `Complete the verse from ${currentVerse.verse}`,
          correctAnswer: getVerseText(currentVerse),
          userAnswer: answer || 'No answer provided',
          timestamp: new Date().toISOString()
        });
      }
    }
  }, [checkAnswer, incrementVersesCompleted, getNextVerse, currentVerse, getVerseText, addFailedAnswer]);

  const handlePlayAgain = useCallback(() => {
    setShowSummary(false);
    setAllFailedVerses([]);
    setInputValue('');
    resetGame();
    if (settings) {
      startGame(settings);
    }
  }, [resetGame, startGame, settings]);

  return (
    <div className="theme-base theme-scripture-sprint min-h-screen">
      <MobileGameHeader title="Scripture Sprint" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="content-container">
          {showSummary ? (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Game Complete!</h1>
              <p className="text-gray-600">Final Score: {getTotalScore()}</p>
              <StreakDisplay 
                gameType="scripture-sprint" 
                currentStreak={streak['scripture-sprint']} 
              />
              <GameSummary 
                failedVerses={allFailedVerses}
                onPlayAgain={handlePlayAgain}
                onExit={() => window.location.href = '/games'}
              />
            </div>
          ) : !isPlaying || !settings ? (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Scripture Sprint</h1>
              <p className="text-gray-600">Race against time to complete Bible verses!</p>
              <StreakDisplay 
                gameType="scripture-sprint" 
                currentStreak={streak['scripture-sprint']} 
              />
              <GameSetup onGameStart={handleGameStart} />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
                <StreakDisplay 
                  gameType="scripture-sprint" 
                  currentStreak={streak['scripture-sprint']} 
                />
                <RoundTimer timeLeft={timeLeft} />
                <div className="mt-2">
                  <span className="font-semibold">Verses Completed: </span>
                  <span className="text-green-600">{versesCompleted}</span>
                  <span className="mx-2">|</span>
                  <span className="font-semibold">Score: </span>
                  <span className="text-indigo-600">{getTotalScore()}</span>
                </div>
              </div>

              <div className="game-interface">
                <VerseDisplay 
                  verse={currentVerse}
                  feedback={feedback}
                  difficulty={settings.difficulty}
                  getVerseText={getVerseText}
                />
                
                <VerseInput
                  onSubmit={handleAnswerSubmit}
                  disabled={timeLeft === 0}
                  attemptsLeft={feedback?.attemptsLeft}
                  value={inputValue}
                  onChange={setInputValue}
                  isGameMaster={settings.isGameMaster}
                  correctAnswer={currentVerse ? getVerseText(currentVerse) : undefined}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptureSprint;