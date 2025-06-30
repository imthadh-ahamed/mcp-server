import type { ApiResponse, UploadResponse, ChatResponse, EmailPayload, EmailResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, error instanceof Error ? error.message : "Unknown error")
  }
}

export async function uploadResume(file: File): Promise<ApiResponse<UploadResponse>> {
  const formData = new FormData()
  formData.append("resume", file)

  const response = await fetch(`${API_BASE_URL}/resume/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })

  if (!response.ok) {
    throw new ApiError(response.status, `Upload failed: ${response.statusText}`)
  }

  return response.json()
}

export async function sendChatMessage(message: string): Promise<ApiResponse<ChatResponse>> {
  return apiRequest<ChatResponse>("/resume/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  })
}

export async function sendTestEmail(payload: EmailPayload): Promise<ApiResponse<EmailResponse>> {
  return apiRequest<EmailResponse>("/email/send", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
