import { useState, useCallback, useRef, useEffect } from 'react';
import type { GameSettings, RoundScore } from '../types';

export const useRoundManager = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [roundScores, setRoundScores] = useState<RoundScore[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const settingsRef = useRef<GameSettings | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const startGame = useCallback((gameSettings: GameSettings) => {
    settingsRef.current = gameSettings;
    setTimeLeft(gameSettings.timePerRound);
    setCurrentRound(1);
    setIsPlaying(true);
    setRoundScores([]);
  }, []);

  const endRound = useCallback((score: RoundScore) => {
    setRoundScores(prev => [...prev, score]);
    
    if (settingsRef.current && currentRound < settingsRef.current.totalRounds) {
      setCurrentRound(prev => prev + 1);
      setTimeLeft(settingsRef.current.timePerRound);
    } else {
      setIsPlaying(false);
    }
  }, [currentRound]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeLeft]);

  const getTotalScore = useCallback(() => {
    return roundScores.reduce((total, round) => total + round.points, 0);
  }, [roundScores]);

  return {
    currentRound,
    timeLeft,
    roundScores,
    isPlaying,
    settings: settingsRef.current,
    startGame,
    endRound,
    getTotalScore
  };
};