import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { ReminderSettings } from '../components/settings/ReminderSettings';
import { FailedAnswersReview } from '../components/settings/FailedAnswersReview';
import { useTheme } from '../hooks/useTheme';

export const Settings: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'night' ? 'bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <SettingsIcon className={`w-8 h-8 mr-3 ${theme === 'night' ? 'text-white' : 'text-indigo-600'}`} />
            <h1 className={`text-3xl font-bold ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
              Settings
            </h1>
          </div>
          <p className={`text-lg ${theme === 'night' ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your reminders and review your progress
          </p>
        </div>

        <div className="space-y-8">
          <ReminderSettings />
          <FailedAnswersReview />
        </div>
      </div>
    </div>
  );
};

export default Settings;