import { useState, useCallback, useRef } from 'react';
import { BIBLE_BOOKS } from '../constants/books';
import { BIBLE_STORIES } from '../constants/stories';
import type { BibleBook, Testament, RoundScore, QuestionHistory, GameMode } from '../types';

export const useGameState = (gameMode: GameMode = 'books') => {
  const [currentItem, setCurrentItem] = useState<BibleBook | any>(() => 
    gameMode === 'books' 
      ? BIBLE_BOOKS[Math.floor(Math.random() * BIBLE_BOOKS.length)]
      : BIBLE_STORIES[Math.floor(Math.random() * BIBLE_STORIES.length)]
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [lastGuessCorrect, setLastGuessCorrect] = useState<boolean | null>(null);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([]);
  
  // Track used items to prevent repetition
  const usedItemsRef = useRef<Set<string>>(new Set());
  // Track if we're in the process of transitioning to next question
  const transitioningRef = useRef(false);

  const getNextItem = useCallback(() => {
    const items = gameMode === 'books' ? BIBLE_BOOKS : BIBLE_STORIES;
    
    // Filter out already used items
    const availableItems = items.filter(item => {
      const itemId = gameMode === 'books' ? item.name : item.id;
      return !usedItemsRef.current.has(itemId);
    });

    // If all items have been used, reset the used items set
    if (availableItems.length === 0) {
      usedItemsRef.current.clear();
      const nextItem = items[Math.floor(Math.random() * items.length)];
      const itemId = gameMode === 'books' ? nextItem.name : nextItem.id;
      usedItemsRef.current.add(itemId);
      setCurrentItem(nextItem);
      setLastGuessCorrect(null); // Clear feedback when resetting questions
      transitioningRef.current = false;
      return;
    }

    // Select random item from remaining available items
    const nextItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    const itemId = gameMode === 'books' ? nextItem.name : nextItem.id;
    usedItemsRef.current.add(itemId);
    
    setCurrentItem(nextItem);
    setLastGuessCorrect(null); // Clear feedback for new question
    transitioningRef.current = false;
  }, [gameMode]);

  const makeGuess = useCallback((testament: Testament) => {
    // Prevent multiple guesses during transition
    if (transitioningRef.current) return;
    transitioningRef.current = true;

    const isCorrect = testament === currentItem.testament;
    
    setQuestionHistory(prev => [...prev, {
      bookName: gameMode === 'books' ? currentItem.name : currentItem.title,
      description: currentItem.description,
      correctTestament: currentItem.testament,
      userAnswer: testament,
      isCorrect
    }]);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setLastGuessCorrect(true);
    } else {
      setWrongAnswers(prev => prev + 1);
      setLastGuessCorrect(false);
    }
    
    // Delay getting next question to show feedback
    setTimeout(() => {
      getNextItem();
    }, 1000);
  }, [currentItem, gameMode, getNextItem]);

  const calculateScore = useCallback((timeLeft: number): RoundScore => {
    const basePoints = (correctAnswers * 100) - (wrongAnswers * 50);
    const timeBonus = Math.floor(timeLeft * 0.5);
    
    return {
      points: Math.max(0, basePoints + timeBonus),
      correctAnswers,
      wrongAnswers,
      timeBonus,
      questions: questionHistory
    };
  }, [correctAnswers, wrongAnswers, questionHistory]);

  const resetGame = useCallback(() => {
    const items = gameMode === 'books' ? BIBLE_BOOKS : BIBLE_STORIES;
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    setCurrentItem(randomItem);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setLastGuessCorrect(null);
    setQuestionHistory([]);
    
    usedItemsRef.current.clear();
    const itemId = gameMode === 'books' ? randomItem.name : randomItem.id;
    usedItemsRef.current.add(itemId);
    
    transitioningRef.current = false;
  }, [gameMode]);

  return {
    currentItem,
    makeGuess,
    calculateScore,
    resetGame,
    correctAnswers,
    wrongAnswers,
    lastGuessCorrect,
    gameMode
  };
};