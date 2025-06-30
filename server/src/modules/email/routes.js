// backend/src/modules/email/routes.js
import { Router } from 'express';
import { sendEmailHandler } from './controllers/emailController.js';

const router = Router();

router.post('/send', sendEmailHandler);

export default router;
