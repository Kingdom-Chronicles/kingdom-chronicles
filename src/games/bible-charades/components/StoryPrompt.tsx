import React from 'react';
import type { BibleStory } from '../types';

interface StoryPromptProps {
  story: BibleStory;
  isActingTeam: boolean;
}

export const StoryPrompt: React.FC<StoryPromptProps> = ({ story, isActingTeam }) => {
  if (!isActingTeam) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Watch the other team act!</h2>
        <p className="text-gray-600">Choose the correct story when you're ready to guess.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img 
        src={story.imageUrl} 
        alt={story.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold mb-4">{story.title}</h2>
      <p className="text-gray-600 mb-4">{story.description}</p>
      <div className="text-sm text-gray-500">Scripture: {story.scripture}</div>
    </div>
  );
};