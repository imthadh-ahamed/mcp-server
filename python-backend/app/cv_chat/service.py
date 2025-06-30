import json
from uuid import uuid4
from PyPDF2 import PdfReader
from typing import Dict
from .models import Resume

_store: Dict[str, Resume] = {}

def parse_resume(file_type: str, raw: bytes) -> Resume:
    text = ""
    if file_type.lower() == "pdf":
        reader = PdfReader(raw)
        for page in reader.pages:
            text += page.extract_text() or ""
    else:
        obj = json.loads(raw.decode())
        # flatten JSON to text
        text = json.dumps(obj, indent=2)

    rid = uuid4()
    resume = Resume(id=rid, text=text)
    _store[str(rid)] = resume
    return resume

def answer_question(resume_id: str, question: str) -> str:
    # naive context-based answer stub
    resume = _store.get(resume_id)
    if not resume:
        return "Resume not found."
    # In production, call OpenAI (or other) here with prompt including resume.text.
    # For now, echo:
    return f"[stub answer to “{question}” based on resume {resume_id}]"