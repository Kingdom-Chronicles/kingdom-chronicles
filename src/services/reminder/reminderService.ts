import { useGameProgressStore } from '../../store/useGameProgressStore';

class ReminderService {
  private worker: Worker | null = null;

  async scheduleReminders() {
    const { reminderSettings, failedAnswers, lastPlayed } = useGameProgressStore.getState();
    if (!reminderSettings.enabled) return;

    console.log('Scheduling reminders...', { 
      failedAnswersCount: failedAnswers.length, 
      lastPlayed,
      reminderSettings 
    });

    // Schedule daily game reminders
    this.scheduleDailyReminders();

    // Schedule verse reminders
    this.scheduleVerseReminders(failedAnswers);
  }

  private scheduleDailyReminders() {
    const { lastPlayed } = useGameProgressStore.getState();
    const now = new Date();
    
    console.log('Checking daily reminders...', { lastPlayed, now: now.toISOString() });
    
    // Check Scripture Sprint
    if (!lastPlayed['scripture-sprint'] || 
        new Date(lastPlayed['scripture-sprint']).getDate() < now.getDate()) {
      this.scheduleNotification(
        'Time for Scripture Sprint!',
        'Keep your streak going and improve your Bible knowledge!'
      );
    }

    // Check Bible Verse
    if (!lastPlayed['bible-verse'] || 
        new Date(lastPlayed['bible-verse']).getDate() < now.getDate()) {
      this.scheduleNotification(
        'Ready for Bible Verse Challenge?',
        'Test your verse-finding skills and maintain your streak!'
      );
    }
  }

  private scheduleVerseReminders(failedAnswers: any[]) {
    const { reminderSettings } = useGameProgressStore.getState();
    
    console.log('Scheduling verse reminders...', { 
      failedAnswersCount: failedAnswers.length,
      maxReminders: reminderSettings.maxReminders 
    });
    
    failedAnswers.forEach(answer => {
      if (answer.reminderCount >= reminderSettings.maxReminders) return;

      console.log('Scheduling reminder for:', answer.question);
      
      this.scheduleNotification(
        'Time to Review a Bible Verse',
        `From ${answer.gameType}: ${answer.question}\nCorrect Answer: ${answer.correctAnswer}`,
        { tag: answer.timestamp }
      );
    });
  }

  private async scheduleNotification(title: string, body: string, options: NotificationOptions = {}) {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }

    const { timeOfDay } = useGameProgressStore.getState().reminderSettings;
    const [hours, minutes] = timeOfDay.split(':').map(Number);

    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (now > scheduledTime) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delay = scheduledTime.getTime() - now.getTime();

    console.log('Scheduling notification:', { title, delay, scheduledTime });

    setTimeout(() => {
      console.log('Showing notification:', title);
      new Notification(title, {
        body,
        icon: '/logo.jpg',
        ...options
      });
    }, delay);
  }

  // Add immediate test notification method
  async testNotification() {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      return false;
    }

    new Notification('Kingdom Chronicles Test', {
      body: 'This is a test reminder! Your daily streak is waiting.',
      icon: '/logo.jpg'
    });

    return true;
  }

  startWorker() {
    console.log('Starting reminder worker...');
    if (!this.worker && 'Worker' in window) {
      this.worker = new Worker(
        new URL('./reminderWorker.ts', import.meta.url),
        { type: 'module' }
      );

      this.worker.onmessage = (event) => {
        if (event.data === 'checkReminders') {
          console.log('Worker triggered reminder check');
          this.scheduleReminders();
        }
      };
    }
  }

  stopWorker() {
    console.log('Stopping reminder worker...');
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const reminderService = new ReminderService();