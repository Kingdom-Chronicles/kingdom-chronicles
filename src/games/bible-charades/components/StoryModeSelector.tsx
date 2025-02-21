import React from 'react';
import type { StoryGenerationMode } from '../types';

interface StoryModeSelectorProps {
  value: StoryGenerationMode;
  onChange: (mode: StoryGenerationMode) => void;
}

export const StoryModeSelector: React.FC<StoryModeSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium form-label mb-1">
        Story Generation Mode Method
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as StoryGenerationMode)}
        className="w-full px-3 py-2 border rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="chatgpt">ChatGPT</option>
        <option value="static">Static Stories</option>
        <option value="bedrock">Amazon Bedrock AI</option>
      </select>
      <p className="mt-1 text-sm text-theme-secondary">
        {value === 'static' && 'Use pre-defined Bible stories'}
        {value === 'bedrock' && 'Generate dynamic stories using Amazon Bedrock AI'}
        {value === 'chatgpt' && 'Generate dynamic stories using ChatGPT'}
      </p>
    </div>
  );
};