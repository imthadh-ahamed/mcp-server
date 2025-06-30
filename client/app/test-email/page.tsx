import EmailForm from "@/components/EmailForm"

export default function TestEmailPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Send Test Email</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Test the email functionality of your MCP backend. This form will send an email through the backend API to
          verify the email integration is working correctly.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EmailForm />
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Notes</h3>
            <ul className="space-y-2 text-yellow-800 text-sm">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <span>Make sure your MCP backend is running</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <span>Email service must be configured in the backend</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <span>Use a valid email address for testing</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">API Endpoint</h3>
            <p className="text-blue-800 text-sm">This form sends a POST request to:</p>
            <code className="block mt-2 p-2 bg-blue-100 rounded text-xs text-blue-900">
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/email/send
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
