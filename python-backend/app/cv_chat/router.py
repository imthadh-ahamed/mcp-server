from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from .models import ResumeCreate, Resume, ChatRequest, ChatResponse
from .service import parse_resume, answer_question

router = APIRouter()

@router.post("/upload", response_model=Resume)
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    if file.content_type not in ["application/pdf", "application/json"]:
        raise HTTPException(400, "Only PDF or JSON resumes supported")
    r = parse_resume("pdf" if file.content_type=="application/pdf" else "json", content)
    return r

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    ans = answer_question(str(req.resume_id), req.question)
    return ChatResponse(answer=ans)