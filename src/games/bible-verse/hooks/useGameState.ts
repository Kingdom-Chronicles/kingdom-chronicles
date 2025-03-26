import { useState, useCallback, useRef,useEffect } from 'react';
import { BIBLE_VERSES } from '../constants/verses';
import type { BibleVerse, RoundScore, VerseAttempt } from '../types';

export const useGameState = () => {
  // Track used verses to prevent repetition
  const usedVersesRef = useRef<Set<string>>(new Set());

  const getRandomVerse = useCallback(() => {
    // Filter out already used verses
    const availableVerses = BIBLE_VERSES.filter(verse => !usedVersesRef.current.has(verse.reference));

    // If all verses have been used, reset the used verses set
    if (availableVerses.length === 0) {
      usedVersesRef.current.clear();
      const verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
      usedVersesRef.current.add(verse.reference);
      return {
        ...verse,
        options: [...verse.options].sort(() => Math.random() - 0.5)
      };
    }

    // Select random verse from remaining available verses
    const verse = availableVerses[Math.floor(Math.random() * availableVerses.length)];
    usedVersesRef.current.add(verse.reference);
    return {
      ...verse,
      options: [...verse.options].sort(() => Math.random() - 0.5)
    };
  }, []);

  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(() => getRandomVerse());
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [versesFound, setVersesFound] = useState(0);
  const [attempts, setAttempts] = useState<VerseAttempt[]>([]);

  const getNextVerse = useCallback(() => {
    const nextVerse = getRandomVerse();
    setCurrentVerse(nextVerse);
    setSelectedVerse(null);
  }, [getRandomVerse]);

  useEffect(() => {
    if (selectedVerse) {
      const isCorrect = selectedVerse === currentVerse.reference;
      
      setAttempts(prev => [...prev, {
        verseText: currentVerse.text,
        correctReference: currentVerse.reference,
        userAnswer: selectedVerse,
        isCorrect
      }]);

      if (isCorrect) {
        setVersesFound(prev => prev + 1);
      }

      // Use setTimeout to prevent state updates during render
      setTimeout(getNextVerse, 1500);
    }
  }, [selectedVerse, currentVerse, getNextVerse]);

  const calculateScore = useCallback((timeLeft: number): RoundScore => {
    const basePoints = versesFound * 100;
    const timeBonus = Math.floor(timeLeft * 0.5);
    
    return {
      points: basePoints + timeBonus,
      versesFound,
      timeBonus,
      attempts
    };
  }, [versesFound, attempts]);

  const resetGame = useCallback(() => {
    // Clear used verses when resetting the game
    usedVersesRef.current.clear();
    const randomVerse = getRandomVerse();
    setCurrentVerse(randomVerse);
    setSelectedVerse(null);
    setVersesFound(0);
    setAttempts([]);
  }, [getRandomVerse]);

  return {
    currentVerse,
    selectedVerse,
    setSelectedVerse,
    calculateScore,
    resetGame,
    versesFound
  };
};