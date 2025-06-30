// backend/src/app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/index.js';
import logger from './utils/logger.js';

import cvChatRoutes from './modules/cv_chat/routes.js';
import emailRoutes from './modules/email/routes.js';

mongoose
  .connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('🗄️  Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/resume', cvChatRoutes);
app.use('/api/email', emailRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = config.server.port;
app.listen(port, () => logger.info(`🚀 Server running on http://localhost:${port}`));
