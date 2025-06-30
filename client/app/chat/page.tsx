import ChatWindow from "@/components/ChatWindow"

export default function ChatPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Chat Assistant</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ask questions about your uploaded resume. The AI assistant can help you understand your strengths, summarize
          your experience, suggest improvements, and more.
        </p>
      </div>

      <ChatWindow />

      <div className="mt-8 bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Questions to Try:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>"What are my key technical skills?"</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>"Summarize my work experience"</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>"What industries have I worked in?"</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>"How can I improve my resume?"</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>"What are my career highlights?"</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span>"List my educational background"</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
