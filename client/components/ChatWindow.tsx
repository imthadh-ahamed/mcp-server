"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, AlertCircle } from "lucide-react"
import { sendChatMessage } from "@/lib/api"
import type { ChatMessage } from "@/lib/types"

interface ChatWindowProps {
  resumeId?: string
}

export default function ChatWindow({ resumeId }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading || !resumeId) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await sendChatMessage(resumeId, inputMessage)

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.data?.answer || "Sorry, I could not process your request.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your message. Please try again.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!resumeId) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
        <h2 className="text-xl font-semibold mb-2">No Resume Selected</h2>
        <p className="text-gray-600">
          Please upload a resume first to start chatting. You can do this from the Upload page.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      <div className="bg-primary-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Resume Chat Assistant</h2>
        <p className="text-primary-100 text-sm">Ask questions about your uploaded resume</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Bot size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Start a conversation about your resume!</p>
            <p className="text-sm mt-2">Try asking: "What are my key skills?" or "Summarize my experience"</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" ? "bg-primary-600" : "bg-gray-200"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={16} className="text-white" aria-label="User" />
                  ) : (
                    <Bot size={16} className="text-gray-600" aria-label="Assistant" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.role === "user" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot size={16} className="text-gray-600" aria-label="Assistant thinking..." />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a question about your resume..."
            aria-label="Chat input"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            aria-label="Send message"
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
