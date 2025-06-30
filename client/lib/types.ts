export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadResponse {
  filename: string
  size: number
  uploadedAt: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface ChatResponse {
  message: string
  timestamp: string
}

export interface EmailPayload {
  to: string
  subject: string
  body: string
}

export interface EmailResponse {
  messageId: string
  status: string
}
