import { useState, useCallback, useRef } from 'react';
import { storyService } from '../services/storyService';
import type { GameState, Team, GameSettings, BibleStory, GameDifficulty, StoryGenerationMode } from '../types';
import { analyticsService } from '../../../services/analytics/analyticsService';
import { timerSound } from '../../../services/audio/timerSound';

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
  const [gameState, setGameState] = useState<GameState>({
    currentStory: null,
    teams: [],
    settings: {
      totalRounds: 5,
      timePerRound: 60,
      storyMode: 'static',
      difficulty: 'medium',
      points: { correct: 100, timeBonus: 10 }
    },
    currentRound: 0,
    timeLeft: 60,
    isPlaying: false,
    roundScore: 0,
    questionsAnswered: 0,
    isLoading: false,
    currentTeamIndex: 0
  });

  const storiesQueue = useRef<BibleStory[]>([]);
  const usedStoryIds = useRef<Set<string>>(new Set());
  const isFetchingStories = useRef(false);

  const fetchStoriesBatch = useCallback(async (mode: StoryGenerationMode, difficulty: GameDifficulty) => {
    if (isFetchingStories.current) return;
    
    isFetchingStories.current = true;
    try {
      console.log("is the difficulty level being passed",difficulty)
      const newStories = await storyService.fetchStoriesBatch(mode, 'general', difficulty);
      // Filter stories by difficulty and exclude used ones

      console.log("The new stories",newStories)
      const filteredStories = newStories.filter(story => 
        story.difficulty === difficulty && !usedStoryIds.current.has(story.id)
      );
      console.log("filteredStories",filteredStories)
      
      const processedStories = filteredStories.map(story => {
        const correctAnswer = story.options[0];
        const shuffledOptions = shuffleArray([...story.options]);
        return {
          ...story,
          correctAnswer,
          options: shuffledOptions
        };
      });

      console.log("processedStories",processedStories)
      
      storiesQueue.current = [...storiesQueue.current, ...processedStories];
      console.log("storiesQueue.currents",storiesQueue.current)
    } catch (error) {
      console.error('Error fetching stories batch:', error);
    } finally {
      isFetchingStories.current = false;
    }
  }, []);

  const getNextStory = useCallback(async () => {
    if (storiesQueue.current.length < 3) {
      setGameState(prev => {
        console.log("getting next story", prev.settings.storyMode, prev.settings.difficulty);
        // Use the settings from prev state to ensure we have latest values
        fetchStoriesBatch(
          prev.settings.storyMode as StoryGenerationMode,
          prev.settings.difficulty as GameDifficulty
        );
        return { ...prev, isLoading: true };
      });
    }

    const nextStory = storiesQueue.current.shift();
    if (nextStory) {
      usedStoryIds.current.add(nextStory.id);
      const shuffledOptions = shuffleArray([...nextStory.options]);
      const storyWithShuffledOptions = {
        ...nextStory,
        options: shuffledOptions
      };
      setGameState(prev => ({ 
        ...prev, 
        isLoading: false, 
        currentStory: storyWithShuffledOptions 
      }));
    } else {
      setGameState(prev => ({ ...prev, isLoading: false, currentStory: null }));
    }
  }, [fetchStoriesBatch]); // Remove gameState.settings from dependency array

  const makeGuess = useCallback(async (guess: string) => {
    if (!gameState.currentStory) return;

    const isCorrect = guess === gameState.currentStory.correctAnswer;
    const points = isCorrect ? gameState.settings.points.correct : 0;
    const timeBonus = Math.floor(gameState.timeLeft * gameState.settings.points.timeBonus);

    setGameState(prev => ({
      ...prev,
      roundScore: prev.roundScore + points + timeBonus,
      questionsAnswered: prev.questionsAnswered + 1,
      teams: prev.teams.map(team => ({
        ...team,
        score: team.isActing ? team.score + points + timeBonus : team.score
      }))
    }));

    await getNextStory();
  }, [gameState, getNextStory]);

  const startGame = useCallback(async (teams: Team[], settings: GameSettings) => {
    analyticsService.trackGameStart('bible-charades', settings);
    usedStoryIds.current.clear();
    storiesQueue.current = []; // Clear existing stories
    
    // First fetch stories
    await fetchStoriesBatch(
      settings.storyMode as StoryGenerationMode, 
      settings.difficulty as GameDifficulty
    );

    // Then set game state
    setGameState(prev => ({
      ...prev,
      teams,
      settings,
      currentRound: 1,
      timeLeft: settings.timePerRound,
      isPlaying: true,
      roundScore: 0,
      questionsAnswered: 0,
      isLoading: true,
      currentTeamIndex: 0
    }));

    // Finally get the first story
    await getNextStory();
  }, [fetchStoriesBatch, getNextStory]);

  const nextRound = useCallback(async () => {
    const allTeamsPlayed = gameState.currentTeamIndex >= gameState.teams.length - 1;
    const isLastRound = gameState.currentRound >= gameState.settings.totalRounds;

    // End game if we've completed all rounds
    if (isLastRound) {
      setGameState(prev => ({ ...prev, isPlaying: false }));
      return;
    }

    // Increment round counter only when all teams have played
    if (allTeamsPlayed) {
      setGameState(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        currentTeamIndex: 0,
        timeLeft: prev.settings.timePerRound,
        roundScore: 0,
        questionsAnswered: 0,
        teams: prev.teams.map(team => ({ ...team, isActing: !team.isActing })),
        isLoading: true
      }));
    } else {
      // Just switch teams without incrementing round
      setGameState(prev => ({
        ...prev,
        currentTeamIndex: prev.currentTeamIndex + 1,
        timeLeft: prev.settings.timePerRound,
        roundScore: 0,
        questionsAnswered: 0,
        teams: prev.teams.map((team, index) => ({
          ...team,
          isActing: index === prev.currentTeamIndex + 1
        })),
        isLoading: true
      }));
    }

    await getNextStory();
  }, [gameState.currentRound, gameState.currentTeamIndex, gameState.settings.totalRounds, gameState.settings.timePerRound, gameState.teams.length, getNextStory]);

  const decrementTime = useCallback(() => {
    setGameState(prev => {
      const newTime = Math.max(0, prev.timeLeft - 1);
      
      // Play timer sound in last 10 seconds
      if (newTime <= 10 && newTime > 0) {
        timerSound.playTick();
      }
      
      return {
        ...prev,
        timeLeft: newTime
      };
    });
  }, []);

  return {
    gameState,
    startGame,
    makeGuess,
    nextRound,
    decrementTime
  };
};