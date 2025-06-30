// backend/src/modules/email/services/emailService.js
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import config from '../../../config/index.js';
import logger from '../../../utils/logger.js';

// Initialize SendGrid if configured
if (config.email?.sendGrid?.apiKey) {
  sgMail.setApiKey(config.email.sendGrid.apiKey);
}

export async function sendEmail({ to, subject, text, html }) {
  if (config.email?.sendGrid?.apiKey) {
    await sgMail.send({ to, from: config.email.from, subject, text, html });
    return;
  }
  const transporter = nodemailer.createTransport(config.email.smtp);
  await transporter.sendMail({
    from: config.email.from,
    to,
    subject,
    text,
    html,
  });
}
