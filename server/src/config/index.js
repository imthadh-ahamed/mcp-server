import dotenv from 'dotenv';
dotenv.config();

export default {
  server: { port: process.env.PORT || 8000 },
  // db:     { uri: process.env.MONGO_URI },
  db:     { uri: "mongodb+srv://mcp:mcp*123@mcp.sjmgcca.mongodb.net/?retryWrites=true&w=majority&appName=mcp" },
  openai: { apiKey: process.env.OPENAI_API_KEY || '' },
  email: {
    from: process.env.EMAIL_FROM || '',
    sendGrid: { apiKey: process.env.SENDGRID_API_KEY || '' },
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    },
  },
};
