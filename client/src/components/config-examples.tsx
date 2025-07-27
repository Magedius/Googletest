export default function ConfigExamples() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      {/* Server Configuration */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-google-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
          Server Configuration
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 font-roboto-mono text-sm overflow-x-auto">
          <pre className="text-gray-800"><code>{`// server.js - Cloud Run Compatible
const express = require('express');
const app = express();

// Critical: Use PORT environment variable
const port = process.env.PORT || 3000;

// Critical: Bind to 0.0.0.0, not localhost
const hostname = '0.0.0.0';

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: port
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

app.listen(port, hostname, () => {
  console.log(\`Server running on \${hostname}:\${port}\`);
});`}</code></pre>
        </div>
      </div>

      {/* Deployment Commands */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-google-green mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2a1 1 0 100-2H5V5a1 1 0 00-1-1zM3 13a1 1 0 100 2h1v-2H3zM10 3a1 1 0 000 2v8a2 2 0 002 2h2a1 1 0 100-2h-2V5a1 1 0 00-1-1zM10 13a1 1 0 100 2h1v-2h-1zM17 3a1 1 0 000 2v8a2 2 0 01-2 2h-2a1 1 0 100-2h2V5a1 1 0 001-1zM17 13a1 1 0 100 2h-1v-2h1z" clipRule="evenodd"/>
          </svg>
          Deployment Commands
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Deploy from Source (Recommended)</h4>
            <div className="bg-gray-50 rounded-lg p-3 font-roboto-mono text-sm overflow-x-auto">
              <code className="text-gray-800">gcloud run deploy my-app --source . --region=us-central1 --allow-unauthenticated</code>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Deploy with Container</h4>
            <div className="bg-gray-50 rounded-lg p-3 font-roboto-mono text-sm space-y-1 overflow-x-auto">
              <div><code className="text-gray-800">gcloud builds submit --tag gcr.io/PROJECT_ID/my-app</code></div>
              <div><code className="text-gray-800">gcloud run deploy --image gcr.io/PROJECT_ID/my-app</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}