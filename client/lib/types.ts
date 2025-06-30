export interface ApiResponse<T = any> {
    data?: T
    error?: string
}

export interface Resume {
    id: string  // UUID from backend
    text: string
}

export interface UploadResponse extends Resume {
    // Extends the Resume type from our FastAPI backend
}

export interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
}

export interface ChatRequest {
    resume_id: string
    question: string
}

export interface ChatResponse {
    answer: string
}

export interface EmailRequest {
    to: string
    subject: string
    body: string
}

// Rename EmailPayload to match our FastAPI model
export type EmailPayload = EmailRequest

export interface EmailResponse {
    status: string
}
