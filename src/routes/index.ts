import { Router } from 'express';
import healthRouter from './health.routes';
import aiRouter from './ai.routes';
import openaiRouter from './openai.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/ai', aiRouter);
router.use('/openai', openaiRouter);

export default router; 