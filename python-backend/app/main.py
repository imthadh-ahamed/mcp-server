from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.cv_chat.router import router as cv_router
from app.email.router import router as email_router

app = FastAPI(title="MCP Server")

# Configure CORS with all required settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js default port
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Origin", "Authorization"],
    expose_headers=["Content-Type"],
    max_age=3600,  # Cache preflight requests for 1 hour
)

app.include_router(cv_router, prefix="/cv", tags=["cv"])
app.include_router(email_router, prefix="/email", tags=["email"])

@app.get("/")
async def root():
    return {"message": "MCP Server is running", "version": settings.app_version}