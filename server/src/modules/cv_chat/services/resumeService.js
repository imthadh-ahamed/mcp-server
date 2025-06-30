// backend/src/modules/cv_chat/services/resumeService.js
import Resume from '../models/Resume.js';
import OpenAI from 'openai';
import config from '../../../config/index.js';

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: config.openai.apiKey });

export async function uploadResume(file) {
  let text;
  if (file.mimetype === 'application/pdf') {
    // dynamically import pdf-parse to avoid loading test data at startup
    const { default: pdfParse } = await import('pdf-parse');
    const data = await pdfParse(file.buffer);
    text = data.text;
  } else if (file.mimetype === 'application/json') {
    text = JSON.stringify(JSON.parse(file.buffer.toString()), null, 2);
  } else {
    throw new Error('Unsupported file type');
  }
  return Resume.create({ fileName: file.originalname, content: text });
}

export async function chatResume(resumeId, question) {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error('Resume not found');

  const prompt = [
    { role: 'system', content: 'You are an assistant that answers questions based on a resume.' },
    { role: 'user',   content: `Resume:\n${resume.content}\n\nQuestion: ${question}` }
  ];

  // Use OpenAI chat completion
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: prompt,
  });
  return completion.choices[0].message.content;
}

// No default export
