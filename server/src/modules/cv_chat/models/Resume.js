// backend/src/modules/cv_chat/models/Resume.js
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  fileName:    { type: String, required: true },
  content:     { type: String, required: true },
  createdAt:   { type: Date,   default: Date.now },
});

const Resume = mongoose.model('Resume', ResumeSchema);
export default Resume;
