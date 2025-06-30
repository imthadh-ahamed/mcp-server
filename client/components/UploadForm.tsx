"use client"

import { useState, useRef } from "react"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { uploadResume } from "@/lib/api"
import type { Resume } from "@/lib/types"

interface UploadFormProps {
  onUploadSuccess?: (resume: Resume) => void
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const validTypes = ["application/pdf", "application/json"]
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setUploadStatus("idle")
        setMessage("")
      } else {
        setMessage("Please select a PDF or JSON file")
        setUploadStatus("error")
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("idle")

    try {
      const response = await uploadResume(file)
      if (response.data) {
        setUploadStatus("success")
        setMessage("Resume uploaded successfully!")
        onUploadSuccess?.(response.data)
      } else {
        throw new Error("Upload response missing data")
      }
    } catch (error) {
      setUploadStatus("error")
      setMessage(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setUploadStatus("idle")
    setMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Resume</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-2">Select Resume File</label>
          <input
            id="resume-upload"
            ref={fileInputRef}
            type="file"
            accept=".pdf,.json"
            onChange={handleFileSelect}
            aria-label="Upload resume file"
            title="Choose a PDF or JSON file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
        </div>

        {file && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText size={16} />
            <span>{file.name}</span>
            <span>({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full flex items-center justify-center space-x-2 bg-gray-900 py-2.5 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span className="text-white font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={16} className="text-white" />
              <span className="text-white font-medium">Upload Resume</span>
            </>
          )}
        </button>

        {message && (
          <div
            className={`flex items-center space-x-2 text-sm ${
              uploadStatus === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {uploadStatus === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{message}</span>
          </div>
        )}

        {uploadStatus === "success" && (
          <button onClick={resetForm} className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium">
            Upload Another Resume
          </button>
        )}
      </div>
    </div>
  )
}
