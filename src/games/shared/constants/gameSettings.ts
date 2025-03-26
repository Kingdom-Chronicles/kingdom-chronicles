export const ROUND_TIMES = [
  { value: 30, label: '30 Seconds' },
  { value: 60, label: '1 Minute' },
  { value: 180, label: '3 Minutes' },
  { value: 300, label: '5 Minutes' },
  { value: 420, label: '7 Minutes' },
  { value: 600, label: '10 Minutes' }
] as const;

export const ROUND_COUNTS = [1, 3, 5, 7, 10] as const;

export const DEFAULT_SETTINGS = {
  rounds: 3,
  timePerRound: 60
} as const;