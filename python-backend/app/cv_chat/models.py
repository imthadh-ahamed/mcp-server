from pydantic import BaseModel
from typing import Optional, Any
from uuid import UUID

class ResumeCreate(BaseModel):
    file_type: str            # "pdf" or "json"
    content: bytes            # raw PDF bytes or JSON string bytes

class Resume(BaseModel):
    id: UUID
    text: str

class ChatRequest(BaseModel):
    resume_id: UUID
    question: str

class ChatResponse(BaseModel):
    answer: str