import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isAfter, isSameDay } from 'date-fns';
import { scoreService } from '../services/scores/scoreService';
import { useAuthStore } from './useAuthStore';

interface FailedAnswer {
  gameType: 'scripture-sprint' | 'bible-verse';
  question: string;
  correctAnswer: string;
  userAnswer: string;
  timestamp: string;
  reminderCount: number;
  lastReminded?: string;
}

interface GameProgress {
  lastPlayed: {
    'scripture-sprint'?: string;
    'bible-verse'?: string;
  };
  streak: {
    'scripture-sprint': number;
    'bible-verse': number;
  };
  failedAnswers: FailedAnswer[];
  reminderSettings: {
    enabled: boolean;
    timeOfDay: string; // HH:mm format
    maxReminders: number;
  };
}

interface GameProgressState extends GameProgress {
  updateLastPlayed: (gameType: keyof GameProgress['lastPlayed']) => void;
  addFailedAnswer: (answer: Omit<FailedAnswer, 'reminderCount'>) => void;
  updateReminderSettings: (settings: Partial<GameProgress['reminderSettings']>) => void;
  incrementReminderCount: (answerId: string) => void;
  checkAndUpdateStreak: (gameType: keyof GameProgress['lastPlayed']) => void;
  syncWithCloud: () => Promise<void>;
}

export const useGameProgressStore = create<GameProgressState>()(
  persist(
    (set, get) => ({
      lastPlayed: {},
      streak: {
        'scripture-sprint': 0,
        'bible-verse': 0
      },
      failedAnswers: [],
      reminderSettings: {
        enabled: true,
        timeOfDay: '09:00',
        maxReminders: 3
      },
      updateLastPlayed: async (gameType) => {
        const now = new Date().toISOString();
        console.log('Updating last played:', gameType, now);
        
        set((state) => ({
          lastPlayed: {
            ...state.lastPlayed,
            [gameType]: now
          }
        }));
        
        get().checkAndUpdateStreak(gameType);
        
        // Sync with cloud if authenticated
        const { user, isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated && user) {
          try {
            const state = get();
            await scoreService.updateGameProgress({
              userId: user.id,
              gameType,
              lastPlayed: now,
              streak: state.streak[gameType],
              timestamp: now
            });
            console.log('Synced progress with cloud');
          } catch (error) {
            console.error('Failed to sync progress with cloud:', error);
          }
        }
      },
      addFailedAnswer: async (answer) => {
        const newAnswer = { ...answer, reminderCount: 0 };
        console.log('Adding failed answer:', newAnswer);
        
        set((state) => ({
          failedAnswers: [...state.failedAnswers, newAnswer]
        }));

        // Sync with cloud if authenticated
        const { user, isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated && user) {
          try {
            await scoreService.saveFailedAnswer({
              userId: user.id,
              ...newAnswer
            });
            console.log('Synced failed answer with cloud');
          } catch (error) {
            console.error('Failed to sync failed answer with cloud:', error);
          }
        }
      },
      updateReminderSettings: (settings) => {
        console.log('Updating reminder settings:', settings);
        set((state) => ({
          reminderSettings: {
            ...state.reminderSettings,
            ...settings
          }
        }));
      },
      incrementReminderCount: async (answerId) => {
        console.log('Incrementing reminder count for:', answerId);
        
        set((state) => ({
          failedAnswers: state.failedAnswers.map(answer =>
            answer.timestamp === answerId
              ? { ...answer, reminderCount: answer.reminderCount + 1, lastReminded: new Date().toISOString() }
              : answer
          )
        }));

        // Sync with cloud if authenticated
        const { user, isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated && user) {
          try {
            const answer = get().failedAnswers.find(a => a.timestamp === answerId);
            if (answer) {
              await scoreService.updateFailedAnswerReminderCount(
                user.id,
                answer.gameType,
                answer.timestamp
              );
              console.log('Synced reminder count with cloud');
            }
          } catch (error) {
            console.error('Failed to sync reminder count with cloud:', error);
          }
        }
      },
      checkAndUpdateStreak: (gameType) => {
        const state = get();
        const lastPlayed = state.lastPlayed[gameType];
        
        console.log('Checking streak for:', gameType, 'last played:', lastPlayed);
        
        if (!lastPlayed) {
          console.log('First time playing, setting streak to 1');
          set((state) => ({
            streak: {
              ...state.streak,
              [gameType]: 1
            }
          }));
          return;
        }

        const lastPlayedDate = new Date(lastPlayed);
        const today = new Date();
        const yesterday = addDays(today, -1);

        if (isSameDay(lastPlayedDate, yesterday)) {
          // Played yesterday, increment streak
          console.log('Played yesterday, incrementing streak');
          set((state) => ({
            streak: {
              ...state.streak,
              [gameType]: state.streak[gameType] + 1
            }
          }));
        } else if (isAfter(lastPlayedDate, yesterday)) {
          // Already played today, keep streak
          console.log('Already played today, keeping streak');
          return;
        } else {
          // Streak broken
          console.log('Streak broken, resetting to 1');
          set((state) => ({
            streak: {
              ...state.streak,
              [gameType]: 1
            }
          }));
        }
      },
      syncWithCloud: async () => {
        const { user, isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated || !user) {
          console.log('Not authenticated, skipping cloud sync');
          return;
        }

        console.log('Syncing with cloud...');
        
        try {
          // Load failed answers from cloud
          const cloudFailedAnswers = await scoreService.getFailedAnswers(user.id);
          
          // Load progress from cloud
          const scriptureProgress = await scoreService.getGameProgress(user.id, 'scripture-sprint');
          const bibleVerseProgress = await scoreService.getGameProgress(user.id, 'bible-verse');

          console.log('Cloud data loaded:', {
            failedAnswers: cloudFailedAnswers.length,
            scriptureProgress,
            bibleVerseProgress
          });

          set((state) => ({
            failedAnswers: cloudFailedAnswers.map(answer => ({
              gameType: answer.gameType,
              question: answer.question,
              correctAnswer: answer.correctAnswer,
              userAnswer: answer.userAnswer,
              timestamp: answer.timestamp,
              reminderCount: answer.reminderCount,
              lastReminded: answer.lastReminded
            })),
            lastPlayed: {
              'scripture-sprint': scriptureProgress?.lastPlayed || state.lastPlayed['scripture-sprint'],
              'bible-verse': bibleVerseProgress?.lastPlayed || state.lastPlayed['bible-verse']
            },
            streak: {
              'scripture-sprint': scriptureProgress?.streak || state.streak['scripture-sprint'],
              'bible-verse': bibleVerseProgress?.streak || state.streak['bible-verse']
            }
          }));
          
          console.log('Cloud sync completed');
        } catch (error) {
          console.error('Failed to sync with cloud:', error);
        }
      }
    }),
    {
      name: 'kingdom-chronicles-progress'
    }
  )
);