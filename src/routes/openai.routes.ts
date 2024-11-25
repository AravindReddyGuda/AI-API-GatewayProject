import { Router } from 'express';
import { OpenAIController } from '../controllers/openai.controller';

const router = Router();
const openaiController = new OpenAIController();

router.post('/chat', openaiController.chat);
router.post('/completion', openaiController.completion);

export default router; 