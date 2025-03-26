import { openAIClient } from '../../../services/openai/client';
import type { BibleStory } from '../types';

class ChatGPTStoryService {
  async generateStories(theme: string, difficulty: string, count: number = 10): Promise<BibleStory[]> {
    try {
      const response = await openAIClient.generateStoryPrompt(theme, difficulty, count);
      let storiesData;
      
      try {
        storiesData = JSON.parse(response);
      } catch (parseError) {
        console.error('Error parsing ChatGPT response:', parseError);
        throw new Error('Invalid response format from ChatGPT');
      }

      if (!Array.isArray(storiesData)) {
        throw new Error('Expected array of stories from ChatGPT');
      }

      return storiesData.map(storyData => ({
        id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: storyData.title,
        description: storyData.description,
        scripture: storyData.scripture,
        difficulty,
        images: [],
        fallbackDescription: storyData.description,
        options: storyData.options,
        devotional: storyData.devotional
      }));
    } catch (error) {
      console.error('Error generating stories from ChatGPT:', error);
      throw error;
    }
  }
}

export const chatgptStoryService = new ChatGPTStoryService();