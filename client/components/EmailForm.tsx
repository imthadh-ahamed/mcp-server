"use client"

import type React from "react"

import { useState } from "react"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { sendTestEmail } from "@/lib/api"

export default function EmailForm() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      await sendTestEmail(formData)
      setStatus("success")
      setMessage("Email sent successfully!")
      setFormData({ to: "", subject: "", body: "" })
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to send email")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Mail className="text-primary-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Send Test Email</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Email subject"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Email message body..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white py-2.5 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span className="text-white font-medium">Sending...</span>
            </>
          ) : (
            <>
              <Mail size={16} className="text-white" />
              <span className="text-white font-medium">Send Email</span>
            </>
          )}
        </button>

        {message && (
          <div
            className={`flex items-center space-x-2 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  )
}
