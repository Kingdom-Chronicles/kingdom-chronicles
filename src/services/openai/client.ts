import { OPENAI_CONFIG } from './config';

interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = OPENAI_CONFIG.apiKey;
    this.baseUrl = OPENAI_CONFIG.baseUrl;

    if (!this.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
  }

  async generateStoryPrompt(theme: string, difficulty: string, count: number = 10): Promise<string> {
    try {
      const prompt = `Generate ${count} Bible-themed story questions with the following requirements:
        - Theme: ${theme}
        - Difficulty: ${difficulty}
        - For each story include:
          * title
          * description
          * scripture reference
          * 4 multiple choice options (first option must be correct)
          * brief devotional message
        - Make them engaging and educational
        - Keep it appropriate for all ages
        - Return as a JSON array with each story having fields: title, description, scripture, options (array), devotional
        
        Format the response as a valid JSON array of story objects.`;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: OPENAI_CONFIG.model,
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate stories from ChatGPT');
      }

      const data = await response.json() as ChatGPTResponse;
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}

export const openAIClient = new OpenAIClient();