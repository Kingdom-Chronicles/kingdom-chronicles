import ReactGA from 'react-ga4';
import { EventCategory, EventAction } from './config';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  trackPageView(path: string) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }

  trackEvent(event: AnalyticsEvent) {
    ReactGA.event({
      category: event.category,
      action: event.action,
      label: event.label,
      value: event.value
    });
  }

  trackTabClick(tabName: string) {
    this.trackEvent({
      category: EventCategory.NAVIGATION,
      action: EventAction.TAB_CLICK,
      label: tabName
    });
  }

  trackGameEvent(action: string, gameType: string, additionalData?: Record<string, any>) {
    this.trackEvent({
      category: EventCategory.GAME,
      action,
      label: gameType,
      ...additionalData
    });
  }

  trackUserEvent(action: string, userId: string) {
    this.trackEvent({
      category: EventCategory.USER,
      action,
      label: userId
    });
  }

  trackAchievement(achievementName: string, userId: string) {
    this.trackEvent({
      category: EventCategory.ACHIEVEMENT,
      action: EventAction.ACHIEVEMENT_UNLOCKED,
      label: achievementName
    });
  }

  // Track game start with detailed parameters
  trackGameStart(gameType: string, settings: any) {
    this.trackGameEvent(EventAction.GAME_START, gameType, {
      gameSettings: settings
    });
  }

  // Track game completion with score
  trackGameEnd(gameType: string, score: number, duration: number) {
    this.trackGameEvent(EventAction.GAME_END, gameType, {
      score,
      duration
    });
  }

  // Track user authentication events
  trackAuth(action: 'login' | 'signup' | 'logout', userId: string) {
    this.trackUserEvent(
      action === 'login' ? EventAction.LOGIN :
      action === 'signup' ? EventAction.SIGNUP :
      EventAction.LOGOUT,
      userId
    );
  }
}

export const analyticsService = new AnalyticsService();