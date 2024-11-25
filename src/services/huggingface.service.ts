import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class HuggingFaceService {
  private apiKey: string;
  private baseURL: string = 'https://api-inference.huggingface.co/models';

  constructor() {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('HUGGINGFACE_API_KEY is not defined in environment variables');
    }
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async generateText(prompt: string, model: string = 'gpt2') {
    try {
      const response = await axios.post(
        `${this.baseURL}/${model}`,
        { inputs: prompt },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      throw error;
    }
  }

  async summarize(text: string, model: string = 'facebook/bart-large-cnn') {
    try {
      const response = await axios.post(
        `${this.baseURL}/${model}`,
        { inputs: text },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      throw error;
    }
  }
} 