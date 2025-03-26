import ReactGA from "react-ga4";

export const initializeAnalytics = () => {
  // Replace with your GA4 Measurement ID
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
};

// Event Categories
export const EventCategory = {
  NAVIGATION: 'Navigation',
  GAME: 'Game',
  USER: 'User',
  ACHIEVEMENT: 'Achievement',
  THEME: 'Theme'
} as const;

// Event Actions
export const EventAction = {
  // Navigation Events
  PAGE_VIEW: 'page_view',
  TAB_CLICK: 'tab_click',
  
  // Theme Events
  THEME_CHANGE: 'change_theme',
  
  // Game Events
  GAME_START: 'game_start',
  GAME_END: 'game_end',
  ROUND_START: 'round_start',
  ROUND_END: 'round_end',
  SCORE_UPDATE: 'score_update',
  
  // User Events
  LOGIN: 'login',
  SIGNUP: 'signup',
  LOGOUT: 'logout',
  
  // Achievement Events
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked'
} as const;