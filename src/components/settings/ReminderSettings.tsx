import React, { useState } from 'react';
import { Bell, Clock, RotateCcw, Save, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGameProgressStore } from '../../store/useGameProgressStore';
import { reminderService } from '../../services/reminder/reminderService';

export const ReminderSettings: React.FC = () => {
  const { 
    reminderSettings, 
    updateReminderSettings, 
    failedAnswers,
    incrementReminderCount 
  } = useGameProgressStore();

  const [localSettings, setLocalSettings] = useState(reminderSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  React.useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleSettingChange = (key: keyof typeof reminderSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    updateReminderSettings(localSettings);
    setHasChanges(false);

    // Request notification permission if enabling reminders
    if (localSettings.enabled && permissionStatus !== 'granted') {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
    }

    // Start reminder service if enabled
    if (localSettings.enabled) {
      reminderService.startWorker();
      reminderService.scheduleReminders();
    } else {
      reminderService.stopWorker();
    }
  };

  const handleReset = () => {
    setLocalSettings(reminderSettings);
    setHasChanges(false);
  };

  const testReminder = async () => {
    const success = await reminderService.testNotification();
    if (!success) {
      alert('Unable to show test notification. Please check your browser permissions.');
    }
  };

  const pendingFailedAnswers = failedAnswers.filter(
    answer => answer.reminderCount < localSettings.maxReminders
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Bell className="w-6 h-6 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Reminder Settings</h2>
      </div>

      {/* Permission Status */}
      {permissionStatus !== 'granted' && localSettings.enabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-yellow-800 font-medium">Notification Permission Required</p>
              <p className="text-yellow-700 text-sm">
                Please allow notifications to receive reminders about your streaks and failed answers.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Enable/Disable Reminders */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Enable Reminders</h3>
            <p className="text-sm text-gray-600">
              Get notified about daily streaks and verses to review
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.enabled}
              onChange={(e) => handleSettingChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {localSettings.enabled && (
          <>
            {/* Time of Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Reminder Time
              </label>
              <input
                type="time"
                value={localSettings.timeOfDay}
                onChange={(e) => handleSettingChange('timeOfDay', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Daily reminders will be sent at this time
              </p>
            </div>

            {/* Max Reminders */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Reminders per Failed Answer
              </label>
              <select
                value={localSettings.maxReminders}
                onChange={(e) => handleSettingChange('maxReminders', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={1}>1 reminder</option>
                <option value={2}>2 reminders</option>
                <option value={3}>3 reminders</option>
                <option value={5}>5 reminders</option>
                <option value={10}>10 reminders</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                How many times to remind you about each failed answer
              </p>
            </div>

            {/* Test Reminder */}
            <div>
              <Button
                onClick={testReminder}
                variant="outline"
                className="w-full"
              >
                <Bell className="w-4 h-4 mr-2" />
                Test Reminder
              </Button>
            </div>
          </>
        )}

        {/* Failed Answers Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Review Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Failed Answers</p>
              <p className="text-2xl font-bold text-red-600">{failedAnswers.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Pending Reminders</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingFailedAnswers.length}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={!hasChanges}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};