import { useState, useCallback, useEffect } from 'react';
import { GAME_LEVELS } from '../constants/levels';
import type { GameState, GameLevel, GameProgress } from '../types';

const STORAGE_KEY = 'kingdom-builders-progress';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Load saved progress
    const saved = localStorage.getItem(STORAGE_KEY);
    const progress: GameProgress = saved ? JSON.parse(saved) : {
      currentLevel: 1,
      completedLevels: [],
      lastPlayed: new Date().toISOString()
    };

    // Initialize levels with progress
    const levels = GAME_LEVELS.map(level => ({
      ...level,
      completed: progress.completedLevels.includes(level.id),
      unlocked: level.id === 1 || progress.completedLevels.includes(level.id - 1)
    }));

    return {
      currentLevel: progress.currentLevel,
      levels,
      isPlaying: false,
      selectedItems: [],
      draggedItem: null,
      showResult: false,
      resultMessage: '',
      isCorrect: false,
      gameCompleted: progress.completedLevels.length >= GAME_LEVELS.length
    };
  });

  const saveProgress = useCallback(() => {
    const progress: GameProgress = {
      currentLevel: gameState.currentLevel,
      completedLevels: gameState.levels.filter(l => l.completed).map(l => l.id),
      lastPlayed: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [gameState.currentLevel, gameState.levels]);

  const startLevel = useCallback((levelId: number) => {
    const level = gameState.levels.find(l => l.id === levelId);
    if (!level || !level.unlocked) return;

    setGameState(prev => ({
      ...prev,
      currentLevel: levelId,
      isPlaying: true,
      selectedItems: [],
      showResult: false,
      resultMessage: '',
      isCorrect: false
    }));
  }, [gameState.levels]);

  const addItemToSequence = useCallback((itemId: string) => {
    setGameState(prev => {
      if (prev.selectedItems.includes(itemId)) return prev;
      
      const newSelectedItems = [...prev.selectedItems, itemId];
      return {
        ...prev,
        selectedItems: newSelectedItems
      };
    });
  }, []);

  const removeItemFromSequence = useCallback((itemId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.filter(id => id !== itemId)
    }));
  }, []);

  const checkSequence = useCallback(() => {
    const currentLevel = gameState.levels.find(l => l.id === gameState.currentLevel);
    if (!currentLevel) return;

    const isCorrect = JSON.stringify(gameState.selectedItems) === JSON.stringify(currentLevel.correctOrder);
    
    setGameState(prev => {
      const updatedLevels = prev.levels.map(level => {
        if (level.id === prev.currentLevel) {
          return { ...level, completed: isCorrect };
        }
        if (level.id === prev.currentLevel + 1 && isCorrect) {
          return { ...level, unlocked: true };
        }
        return level;
      });

      return {
        ...prev,
        levels: updatedLevels,
        showResult: true,
        isCorrect,
        resultMessage: isCorrect 
          ? `🎉 Well done! You completed ${currentLevel.title}!`
          : `❌ Not quite right. Try again!`,
        gameCompleted: isCorrect && prev.currentLevel === GAME_LEVELS.length
      };
    });
  }, [gameState.selectedItems, gameState.currentLevel, gameState.levels]);

  const nextLevel = useCallback(() => {
    if (gameState.currentLevel < GAME_LEVELS.length) {
      startLevel(gameState.currentLevel + 1);
    } else {
      setGameState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [gameState.currentLevel, startLevel]);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const levels = GAME_LEVELS.map(level => ({
      ...level,
      completed: false,
      unlocked: level.id === 1
    }));

    setGameState({
      currentLevel: 1,
      levels,
      isPlaying: false,
      selectedItems: [],
      draggedItem: null,
      showResult: false,
      resultMessage: '',
      isCorrect: false,
      gameCompleted: false
    });
  }, []);

  const exitToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      selectedItems: [],
      showResult: false,
      resultMessage: '',
      isCorrect: false
    }));
  }, []);

  // Save progress whenever levels change
  useEffect(() => {
    saveProgress();
  }, [saveProgress]);

  return {
    gameState,
    startLevel,
    addItemToSequence,
    removeItemFromSequence,
    checkSequence,
    nextLevel,
    resetGame,
    exitToMenu,
    setDraggedItem: useCallback((itemId: string | null) => {
      setGameState(prev => ({ ...prev, draggedItem: itemId }));
    }, [])
  };
};