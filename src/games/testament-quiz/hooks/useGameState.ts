import { useState, useCallback } from 'react';
import { BIBLE_BOOKS } from '../constants/books';
import { BIBLE_STORIES } from '../constants/stories';
import type { BibleBook, Testament, RoundScore, QuestionHistory, GameMode } from '../types';
import { timerSound } from '../../../services/audio/timerSound';

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

  const getNextItem = useCallback(() => {
    const items = gameMode === 'books' ? BIBLE_BOOKS : BIBLE_STORIES;
    const currentIndex = items.findIndex(item => 
      gameMode === 'books' 
        ? item.name === (currentItem as BibleBook).name
        : item.title === currentItem.title
    );
    const remainingItems = items.filter((_, index) => index !== currentIndex);
    const nextItem = remainingItems[Math.floor(Math.random() * remainingItems.length)];
    setCurrentItem(nextItem);
  }, [currentItem, gameMode]);

  const makeGuess = useCallback((testament: Testament) => {
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
    
    setTimeout(() => {
      getNextItem();
      setLastGuessCorrect(null);
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
    setCurrentItem(items[Math.floor(Math.random() * items.length)]);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setLastGuessCorrect(null);
    setQuestionHistory([]);
  }, [gameMode]);

  return {
    currentItem,
    makeGuess,
    calculateScore,
    resetGame,
    correctAnswers,
    wrongAnswers,
    lastGuessCorrect
  };
};