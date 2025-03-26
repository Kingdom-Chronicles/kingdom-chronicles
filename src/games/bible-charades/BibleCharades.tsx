import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from './components/Timer';
import { GameSetup } from './components/GameSetup';
import { StoryDisplay } from './components/StoryDisplay';
import { TeamScores } from './components/TeamScores';
import { GameOver } from './components/GameOver';
import { MobileGameHeader } from '../../components/layout/MobileGameHeader';
import { useGameState } from './hooks/useGameState';
import confetti from 'canvas-confetti';

export const BibleCharades: React.FC = () => {
  const { 
    gameState, 
    startGame, 
    makeGuess, 
    nextRound,
    decrementTime 
  } = useGameState();

  const { 
    currentStory, 
    teams, 
    currentRound, 
    timeLeft, 
    isPlaying, 
    roundScore,
    settings,
    questionsAnswered,
    isLoading
  } = gameState;

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0 || isLoading) return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, decrementTime, isLoading]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      nextRound();
    }
  }, [isPlaying, timeLeft, nextRound]);

  const handleGuess = useCallback(async (guess: string) => {
    if (!currentStory) return;
    
    // Only trigger confetti if the guess matches the correct answer
    if (guess === currentStory.correctAnswer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    await makeGuess(guess);
  }, [currentStory, makeGuess]);

  return (
    <div className="theme-base theme-bible-charades min-h-screen">
      <MobileGameHeader title="Bible Charades" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="content-container">
          {!isPlaying ? (
            <div className="max-w-4xl mx-auto p-4">
              <h1 className="text-3xl font-bold text-center mb-8">Bible Charades</h1>
              {currentRound === 0 ? (
                <GameSetup onGameStart={startGame} />
              ) : (
                <GameOver teams={teams} onPlayAgain={() => window.location.reload()} />
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Round {currentRound} of {settings.totalRounds}</h2>
                <div className="mt-2 space-y-1">
                  <p className="text-green-600">Questions Answered: {questionsAnswered}</p>
                  <p className="text-indigo-600">Round Score: {roundScore}</p>
                </div>
              </div>

              <div className="game-interface">
                <TeamScores teams={teams} />
                <Timer timeLeft={timeLeft} />

                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-8 bg-white rounded-lg shadow-md"
                    >
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                      <p className="text-lg text-gray-600">
                        Generating new questions... Please wait!
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {currentStory && timeLeft > 0 && (
                        <motion.div
                          key={currentStory.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <StoryDisplay 
                            story={currentStory}
                            onGuess={handleGuess}
                          />
                        </motion.div>
                      )}

                      {timeLeft === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-white rounded-lg shadow-md p-6"
                        >
                          <h3 className="text-xl font-bold mb-4">Time's Up!</h3>
                          <div className="mb-6">
                            <p className="text-lg mb-2">Round Summary:</p>
                            <div className="bg-indigo-50 p-4 rounded-lg">
                              <p className="font-semibold">Questions Answered: {questionsAnswered}</p>
                              <p className="font-semibold">Total Score: {roundScore}</p>
                            </div>
                          </div>
                          <button
                            onClick={nextRound}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                          >
                            {currentRound < settings.totalRounds ? 'Next Round' : 'End Game'}
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};