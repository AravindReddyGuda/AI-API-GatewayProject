import { Request, Response } from 'express';
import { OpenAIService } from '../services/openai.service';

export class OpenAIController {
  private openAIService: OpenAIService;

  constructor() {
    this.openAIService = new OpenAIService();
  }

  public chat = async (req: Request, res: Response) => {
    try {
      const { messages, model } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
          status: 'error',
          message: 'Messages array is required'
        });
      }

      const result = await this.openAIService.generateChat(messages, model);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error generating chat response',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public completion = async (req: Request, res: Response) => {
    try {
      const { prompt, model } = req.body;
      
      if (!prompt) {
        return res.status(400).json({
          status: 'error',
          message: 'Prompt is required'
        });
      }

      const result = await this.openAIService.generateCompletion(prompt, model);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error generating completion',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
} 