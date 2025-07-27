import { useQuery } from "@tanstack/react-query";
import WelcomeHero from "@/components/welcome-hero";
import StatusGrid from "@/components/status-grid";
import ConfigExamples from "@/components/config-examples";

export default function Home() {
  const { data: serverInfo } = useQuery({
    queryKey: ['/api/server-info'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: envInfo } = useQuery({
    queryKey: ['/api/environment'],
  });

  return (
    <div className="bg-gray-50 font-roboto min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-google-blue rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-medium text-gray-900">Cloud Run Test App</h1>
                <p className="text-sm text-gray-500">Deployment Testing Application</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHero />
        <StatusGrid serverInfo={serverInfo} envInfo={envInfo} />
        <ConfigExamples />
        
        {/* Troubleshooting Guide */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-google-red mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            Common Deployment Issues
          </h3>
          <div className="space-y-4">
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">Container failed to start</h4>
              <p className="text-red-700 text-sm mb-2">Error: "Container failed to start and listen on the port defined by PORT"</p>
              <ul className="text-red-700 text-sm space-y-1 ml-4">
                <li>• Ensure you're using <code className="bg-red-100 px-1 rounded">process.env.PORT</code></li>
                <li>• Bind to <code className="bg-red-100 px-1 rounded">0.0.0.0</code>, not <code className="bg-red-100 px-1 rounded">127.0.0.1</code></li>
                <li>• Add proper <code className="bg-red-100 px-1 rounded">"start"</code> script in package.json</li>
                <li>• Check container logs with <code className="bg-red-100 px-1 rounded">gcloud run logs read</code></li>
              </ul>
            </div>
            
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Build failures</h4>
              <p className="text-yellow-700 text-sm mb-2">Common build and deployment issues</p>
              <ul className="text-yellow-700 text-sm space-y-1 ml-4">
                <li>• Add <code className="bg-yellow-100 px-1 rounded">.dockerignore</code> file to exclude node_modules</li>
                <li>• Specify Node.js version in <code className="bg-yellow-100 px-1 rounded">engines</code> field</li>
                <li>• Use <code className="bg-yellow-100 px-1 rounded">--only=production</code> for npm install</li>
                <li>• Ensure sufficient memory allocation (minimum 128Mi)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              Google Cloud Run Test Application - Ready for deployment
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="https://cloud.google.com/run/docs" className="text-google-blue hover:underline" target="_blank" rel="noopener noreferrer">
                Cloud Run Docs
              </a>
              <a href="https://cloud.google.com/run/docs/container-contract" className="text-google-blue hover:underline" target="_blank" rel="noopener noreferrer">
                Container Contract
              </a>
              <a href="https://cloud.google.com/run/docs/troubleshooting" className="text-google-blue hover:underline" target="_blank" rel="noopener noreferrer">
                Troubleshooting
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
