import { useState, useCallback, useRef } from 'react';
import { timerSound } from '../../../services/audio/timerSound';

interface GameSettings {
  totalRounds: number;
  timePerRound: number;
  points: Record<string, number>;
}

interface RoundScore {
  points: number;
  [key: string]: any;
}

export const useRoundManager = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [roundScores, setRoundScores] = useState<RoundScore[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const settingsRef = useRef<GameSettings | null>(null);
  const endingRound = useRef(false);
  const roundCompleted = useRef(false);

  const startGame = useCallback((gameSettings: GameSettings) => {
    settingsRef.current = gameSettings;
    setTimeLeft(gameSettings.timePerRound);
    setCurrentRound(1);
    setIsPlaying(true);
    setRoundScores([]);
    endingRound.current = false;
    roundCompleted.current = false;
  }, []);

  const endRound = useCallback((score: RoundScore) => {
    if (endingRound.current || !settingsRef.current) return;
    endingRound.current = true;

    setRoundScores(prev => [...prev, score]);
    
    if (currentRound < settingsRef.current.totalRounds) {
      setCurrentRound(prev => prev + 1);
      setTimeLeft(settingsRef.current.timePerRound);
      endingRound.current = false;
      roundCompleted.current = false;
    } else {
      setIsPlaying(false);
      roundCompleted.current = true;
    }
  }, [currentRound]);

  const decrementTime = useCallback(() => {
    if (roundCompleted.current) return;
    
    setTimeLeft(prev => {
      const newTime = Math.max(0, prev - 1);
      
      if (newTime <= 10 && newTime > 0) {
        timerSound.playTick();
      }
      
      return newTime;
    });
  }, []);

  const getTotalScore = useCallback(() => {
    return roundScores.reduce((total, round) => total + round.points, 0);
  }, [roundScores]);

  const isGameComplete = useCallback(() => {
    return settingsRef.current && currentRound > settingsRef.current.totalRounds;
  }, [currentRound]);

  return {
    currentRound,
    timeLeft,
    roundScores,
    isPlaying,
    settings: settingsRef.current,
    startGame,
    endRound,
    decrementTime,
    getTotalScore,
    isGameComplete
  };
};