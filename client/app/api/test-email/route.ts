import { type NextRequest, NextResponse } from "next/server"
import { sendTestEmail } from "@/lib/api"
import type { EmailPayload } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body: EmailPayload = await request.json()

    // Validate required fields
    if (!body.to || !body.subject || !body.body) {
      return NextResponse.json({ error: "Missing required fields: to, subject, body" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.to)) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 })
    }

    const response = await sendTestEmail(body)

    if (response.success) {
      return NextResponse.json({
        success: true,
        data: response.data,
        message: "Email sent successfully",
      })
    } else {
      return NextResponse.json({ error: response.error || "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Email API error:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
        success: false,
      },
      { status: 500 },
    )
  }
}
