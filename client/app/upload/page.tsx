"use client"

import UploadForm from "@/components/UploadForm"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function UploadPage() {
  const [uploadSuccess, setUploadSuccess] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your resume in PDF or JSON format to start using the AI-powered chat assistant. The system will analyze
          your resume and be ready to answer questions about your experience, skills, and qualifications.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <UploadForm onUploadSuccess={() => setUploadSuccess(true)} />
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Supported Formats</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>
                  <strong>PDF:</strong> Standard resume format
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>
                  <strong>JSON:</strong> Structured resume data
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Your resume is securely processed</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>AI analyzes your content</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Chat assistant becomes available</span>
              </li>
            </ul>
          </div>

          {uploadSuccess && (
            <div className="bg-white border-2 border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Ready to Chat!</h3>
              <p className="text-primary-800 mb-4">
                Your resume has been uploaded successfully. You can now start asking questions about your experience,
                skills, and qualifications.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                <MessageCircle size={16} />
                <span>Start Chatting</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
