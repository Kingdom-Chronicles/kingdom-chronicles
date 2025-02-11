export const GAME_SETTINGS = {
  ROUND_TIME: 60, // seconds
  POINTS: {
    CORRECT_FIRST_TRY: 100,
    CORRECT_SECOND_TRY: 50,
    BONUS_TIME: 10, // bonus points per remaining second
  },
  MIN_PLAYERS_PER_TEAM: 2,
  MAX_PLAYERS_PER_TEAM: 6,
  ROUNDS_PER_GAME: 10,
} as const;