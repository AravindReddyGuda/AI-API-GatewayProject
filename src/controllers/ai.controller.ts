import { Request, Response } from 'express';
import { HuggingFaceService } from '../services/huggingface.service';

export class AIController {
  private huggingFaceService: HuggingFaceService;

  constructor() {
    this.huggingFaceService = new HuggingFaceService();
  }

  public generateText = async (req: Request, res: Response) => {
    try {
      const { prompt, model } = req.body;
      
      if (!prompt) {
        return res.status(400).json({
          status: 'error',
          message: 'Prompt is required'
        });
      }

      const result = await this.huggingFaceService.generateText(prompt, model);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error generating text',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  public summarize = async (req: Request, res: Response) => {
    try {
      const { text, model } = req.body;
      
      if (!text) {
        return res.status(400).json({
          status: 'error',
          message: 'Text is required'
        });
      }

      const result = await this.huggingFaceService.summarize(text, model);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error summarizing text',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
} 