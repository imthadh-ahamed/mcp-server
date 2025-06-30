import Link from "next/link"
import { Upload, MessageCircle, Mail, FileText } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Upload your PDF or JSON resume to get started with AI-powered analysis.",
      href: "/upload",
      color: "text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Chat Assistant",
      description: "Ask questions about your resume and get intelligent responses.",
      href: "/chat",
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Test Email",
      description: "Send test emails through the MCP backend integration.",
      href: "/test-email",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MCP Frontend</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A powerful Next.js application that connects to your Model Context Protocol backend for resume management,
          AI-powered chat assistance, and email functionality.
        </p>
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <FileText size={20} />
          <span>Built with Next.js 14, TypeScript, and Tailwind CSS</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <feature.icon className={`${feature.color} group-hover:scale-110 transition-transform`} size={24} />
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
            <div className="mt-4 text-primary-600 font-medium group-hover:text-primary-700">Get started →</div>
          </Link>
        ))}
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
            <ol className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </span>
                <span>Upload your resume in PDF or JSON format</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </span>
                <span>Start chatting with the AI about your resume</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </span>
                <span>Test email functionality with the backend</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>Responsive design for all devices</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>Real-time chat with AI assistant</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>File upload with progress tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span>Email integration testing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
