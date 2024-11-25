import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class OpenAIService {
  private apiKey: string;
  private baseURL: string = 'https://api.openai.com/v1';

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables');
    }
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async generateChat(messages: Array<{ role: string; content: string }>, model: string = 'gpt-3.5-turbo') {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages,
          temperature: 0.7,
        },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }

  async generateCompletion(prompt: string, model: string = 'gpt-3.5-turbo-instruct') {
    try {
      const response = await axios.post(
        `${this.baseURL}/completions`,
        {
          model,
          prompt,
          max_tokens: 150,
          temperature: 0.7,
        },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }
} 