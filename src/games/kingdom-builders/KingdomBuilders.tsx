import React, { useState, useEffect } from 'react';
import { MobileGameHeader } from '../../components/layout/MobileGameHeader';
import { GameSetup } from './components/GameSetup';
import { LevelSelector } from './components/LevelSelector';
import { StoryLevel } from './components/StoryLevel';
import { CompletionMessage } from './components/CompletionMessage';
import { useGameProgressStore } from '../../store/useGameProgressStore';
import { analyticsService } from '../../services/analytics/analyticsService';
import type { StoryLevel as StoryLevelType } from './types';

export const KingdomBuilders: React.FC = () => {
  // Game state
  const [gameMode, setGameMode] = useState<'setup' | 'level-select' | 'playing' | 'completed'>('setup');
  const [currentLevel, setCurrentLevel] = useState<StoryLevelType>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<StoryLevelType[]>([1]);
  const [score, setScore] = useState(0);
  
  // Game progress from localStorage
  const STORAGE_KEY = 'kingdom-builders-progress';
  
  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setUnlockedLevels(progress.unlockedLevels || [1]);
        setCurrentLevel(progress.currentLevel || 1);
        setScore(progress.score || 0);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);
  
  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      unlockedLevels,
      currentLevel,
      score
    }));
  }, [unlockedLevels, currentLevel, score]);
  
  // Handle level completion
  const handleLevelComplete = (levelScore: number) => {
    // Update score
    setScore(prev => prev + levelScore);
    
    // Unlock next level if available
    if (currentLevel < 5) {
      setUnlockedLevels(prev => {
        if (!prev.includes(currentLevel + 1 as StoryLevelType)) {
          return [...prev, currentLevel + 1 as StoryLevelType];
        }
        return prev;
      });
    }
    
    // Check if all levels are completed
    if (currentLevel === 5) {
      setGameMode('completed');
    } else {
      setCurrentLevel(prev => (prev + 1) as StoryLevelType);
      setGameMode('playing');
    }
    
    // Track analytics
    analyticsService.trackEvent({
      category: 'Game',
      action: 'level_complete',
      label: `kingdom-builders-level-${currentLevel}`,
      value: levelScore
    });
  };
  
  // Reset game progress
  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setUnlockedLevels([1]);
      setCurrentLevel(1);
      setScore(0);
      setGameMode('setup');
      localStorage.removeItem(STORAGE_KEY);
      
      analyticsService.trackEvent({
        category: 'Game',
        action: 'reset_progress',
        label: 'kingdom-builders'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      <MobileGameHeader title="Bible Story Adventures" />
      
      <div className="flex-1 flex items-center justify-center p-4">
        {gameMode === 'setup' && (
          <GameSetup 
            onGameStart={() => setGameMode('playing')}
            onShowLevelSelector={() => setGameMode('level-select')}
            unlockedLevels={unlockedLevels}
          />
        )}
        
        {gameMode === 'level-select' && (
          <LevelSelector 
            unlockedLevels={unlockedLevels}
            currentLevel={currentLevel}
            onLevelSelect={(level) => {
              setCurrentLevel(level);
              setGameMode('playing');
              
              analyticsService.trackEvent({
                category: 'Game',
                action: 'select_level',
                label: `kingdom-builders-level-${level}`
              });
            }}
            onBack={() => setGameMode('setup')}
          />
        )}
        
        {gameMode === 'playing' && (
          <StoryLevel 
            level={currentLevel}
            onComplete={handleLevelComplete}
            onExit={() => setGameMode('level-select')}
          />
        )}
        
        {gameMode === 'completed' && (
          <CompletionMessage 
            finalScore={score}
            onPlayAgain={() => {
              setCurrentLevel(1);
              setGameMode('playing');
            }}
            onExit={() => window.location.href = '/games'}
          />
        )}
      </div>
    </div>
  );
};

export default KingdomBuilders;
