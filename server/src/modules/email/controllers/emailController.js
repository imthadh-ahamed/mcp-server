// backend/src/modules/email/controllers/emailController.js
import { sendEmail } from '../services/emailService.js';
import logger from '../../../utils/logger.js';

async function sendEmailHandler(req, res, next) {
  try {
    const { to, subject, body } = req.body;
    await sendEmail({ to, subject, text: body, html: `<p>${body}</p>` });
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export { sendEmailHandler };
