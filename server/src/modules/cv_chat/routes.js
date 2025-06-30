// backend/src/modules/cv_chat/routes.js
import { Router } from 'express';
import multer from 'multer';
import { uploadHandler, chatHandler } from './controllers/resumeController.js';

const router = Router();
const upload = multer();
router.post('/upload', upload.single('resume'), uploadHandler);
router.post('/chat',    chatHandler);

export default router;
