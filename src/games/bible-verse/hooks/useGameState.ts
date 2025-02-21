import { useState, useCallback, useEffect } from 'react';
import { BIBLE_VERSES } from '../constants/verses';
import type { BibleVerse, RoundScore, VerseAttempt } from '../types';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useGameState = () => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(() => {
    const verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
    return {
      ...verse,
      options: shuffleArray(verse.options)
    };
  });
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [versesFound, setVersesFound] = useState(0);
  const [attempts, setAttempts] = useState<VerseAttempt[]>([]);

  const getNextVerse = useCallback(() => {
    const currentIndex = BIBLE_VERSES.findIndex(v => v.reference === currentVerse.reference);
    const remainingVerses = BIBLE_VERSES.filter((_, index) => index !== currentIndex);
    const nextVerse = remainingVerses[Math.floor(Math.random() * remainingVerses.length)];
    
    // Shuffle the options for the new verse
    setCurrentVerse({
      ...nextVerse,
      options: shuffleArray(nextVerse.options)
    });
  }, [currentVerse]);

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

      setTimeout(() => {
        getNextVerse();
        setSelectedVerse(null);
      }, 1500);
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
    const randomVerse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
    setCurrentVerse({
      ...randomVerse,
      options: shuffleArray(randomVerse.options)
    });
    setSelectedVerse(null);
    setVersesFound(0);
    setAttempts([]);
  }, []);

  return {
    currentVerse,
    selectedVerse,
    setSelectedVerse,
    calculateScore,
    resetGame,
    versesFound
  };
};