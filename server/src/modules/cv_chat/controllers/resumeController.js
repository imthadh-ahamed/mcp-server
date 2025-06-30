// backend/src/modules/cv_chat/controllers/resumeController.js
import * as resumeService from '../services/resumeService.js';
import logger from '../../../utils/logger.js';

async function uploadHandler(req, res, next) {
  try {
    const resume = await resumeService.uploadResume(req.file);
    res.json({ id: resume._id, message: 'Resume uploaded successfully' });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

async function chatHandler(req, res, next) {
  try {
    const { resumeId, question } = req.body;
    const answer = await resumeService.chatResume(resumeId, question);
    res.json({ answer });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export { uploadHandler, chatHandler };
