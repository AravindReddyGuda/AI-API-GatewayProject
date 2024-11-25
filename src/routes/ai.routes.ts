import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';

const router = Router();
const aiController = new AIController();

router.post('/generate', aiController.generateText);
router.post('/summarize', aiController.summarize);

export default router; 