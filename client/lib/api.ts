import type { ApiResponse, UploadResponse, ChatResponse, EmailPayload, EmailResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const defaultHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Origin": window.location.origin,
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: "include", // Required for CORS with credentials
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      mode: "cors", // Explicitly set CORS mode
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error ?? `HTTP error! status: ${response.status}`
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      0,
      error instanceof Error ? error.message : "Unknown error"
    )
  }
}

export async function uploadResume(file: File): Promise<ApiResponse<UploadResponse>> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/cv/upload`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      Accept: "application/json",
      Origin: window.location.origin,
    },
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error ?? `Upload failed: ${response.statusText}`
    )
  }

  return data
}

export async function sendChatMessage(resumeId: string, question: string): Promise<ApiResponse<ChatResponse>> {
  return apiRequest<ChatResponse>("/cv/chat", {
    method: "POST",
    body: JSON.stringify({ resume_id: resumeId, question }),
  })
}

export async function sendTestEmail(payload: EmailPayload): Promise<ApiResponse<EmailResponse>> {
  return apiRequest<EmailResponse>("/email/send", {
    method: "POST",
    body: JSON.stringify({
      to: payload.to,
      subject: payload.subject,
      body: payload.body
    }),
  })
}
