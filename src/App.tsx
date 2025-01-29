import React, { useState } from 'react';
import { Mail, Lock, User, Upload, Send, Server, FileText } from 'lucide-react';

type Page = 'login' | 'emailForm';

interface EmailLog {
  email: string;
  status: 'success' | 'error';
  message: string;
}

function App() {
  const [page, setPage] = useState<Page>('login');
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPage('emailForm');
  };

  const handleSendEmails = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email sending
    const sampleLogs: EmailLog[] = [
      { email: 'test1@example.com', status: 'success', message: 'Email sent successfully' },
      { email: 'test2@example.com', status: 'error', message: 'Failed to send email' },
    ];
    setLogs(sampleLogs);
    setShowLogs(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {page === 'login' ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Email Automation</h1>
              <p className="text-gray-600">Sign in to access the system</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </div>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </div>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen p-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Email Configuration</h1>
              <p className="text-gray-600">Configure and send bulk emails</p>
            </div>
            <form onSubmit={handleSendEmails} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Server className="w-4 h-4" />
                      <span>SMTP Domain</span>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="smtp.example.com"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Server className="w-4 h-4" />
                      <span>SMTP Port</span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="587"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Subject</span>
                  </div>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Email Body</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Upload className="w-4 h-4" />
                      <span>Attachment</span>
                    </div>
                    <input
                      type="file"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Upload className="w-4 h-4" />
                      <span>CSV File with Emails</span>
                    </div>
                    <input
                      type="file"
                      required
                      accept=".csv"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="w-4 h-4" />
                Send Emails
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Logs Dialog */}
      {showLogs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Email Sending Results</h2>
            <div className="max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-3 mb-2 rounded-lg ${
                    log.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  <p className="font-medium">{log.email}</p>
                  <p className="text-sm">{log.message}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowLogs(false)}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;