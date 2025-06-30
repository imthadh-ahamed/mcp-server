from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from .service import send_email

router = APIRouter()

class EmailRequest(BaseModel):
    to: EmailStr
    subject: str
    body: str

@router.post("/send")
async def send(req: EmailRequest):
    try:
        send_email(req.to, req.subject, req.body)
    except Exception as e:
        raise HTTPException(500, f"Failed to send: {e}")
    return {"status": "sent"}