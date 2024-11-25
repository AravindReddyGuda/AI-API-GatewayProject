import { Request, Response } from 'express';

export class HealthController {
  public check = async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      message: 'API Gateway is running'
    });
  };
} 