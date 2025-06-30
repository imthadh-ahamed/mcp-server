"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import UploadForm from "@/components/UploadForm"
import type { Resume } from "@/lib/types"

export default function UploadPage() {
  const router = useRouter()
  const [uploadedResume, setUploadedResume] = useState<Resume | null>(null)

  const handleUploadSuccess = (resume: Resume) => {
    setUploadedResume(resume)
    // Store resumeId in localStorage for persistence
    localStorage.setItem("currentResumeId", resume.id)
  }

  const handleStartChat = () => {
    router.push("/chat")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your resume in PDF or JSON format to start using the AI-powered chat assistant. The system will analyze
          your resume and help you explore your experience.
        </p>
      </div>

      <div className="mb-8">
        <UploadForm onUploadSuccess={handleUploadSuccess} />
      </div>

      {uploadedResume && (
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-700">
              Your resume has been uploaded successfully! You can now start asking questions about your experience,
              skills, and qualifications.
            </p>
          </div>
          <button
            onClick={handleStartChat}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Start Chatting
          </button>
        </div>
      )}
    </div>
  )
}
