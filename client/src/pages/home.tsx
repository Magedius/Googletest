import { useQuery } from "@tanstack/react-query";

interface ServerInfo {
  port: string;
  hostname: string;
  uptime: number;
  platform: string;
  service: string;
  revision: string;
}

interface EnvironmentInfo {
  NODE_ENV: string;
  PORT: string;
  GOOGLE_CLOUD_PROJECT?: string;
  GOOGLE_CLOUD_REGION?: string;
}

export default function Home() {
  const { data: serverInfo, isLoading: serverLoading } = useQuery<ServerInfo>({
    queryKey: ['/api/server-info'],
    refetchInterval: 30000,
  });

  const { data: envInfo, isLoading: envLoading } = useQuery<EnvironmentInfo>({
    queryKey: ['/api/environment'],
  });

  const testHealth = async () => {
    try {
      const response = await fetch('/health');
      const data = await response.json();
      alert(`Health Check OK!\nStatus: ${data.status}\nUptime: ${Math.floor(data.uptime)}s`);
    } catch (error) {
      alert('Health check failed: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Google Cloud Run Deployment SUCCESS!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            GitHub to Cloud Run pipeline working perfectly!
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={testHealth}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Test Health Check
            </button>
            <a 
              href="/health" 
              target="_blank"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              View /health Endpoint
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Server Status */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Server Status</h2>
            {serverLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            ) : serverInfo ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Port</p>
                    <p className="text-2xl font-bold text-blue-600">{serverInfo.port}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold text-green-600">{serverInfo.uptime}s</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Host:</span>
                    <span className="font-mono">{serverInfo.hostname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform:</span>
                    <span className="font-semibold">{serverInfo.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-mono">{serverInfo.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revision:</span>
                    <span className="font-mono">{serverInfo.revision}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✅ Server Running & Healthy</p>
                </div>
              </div>
            ) : (
              <p className="text-red-600">Failed to load server information</p>
            )}
          </div>

          {/* Environment Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Environment</h2>
            {envLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            ) : envInfo ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Environment:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      envInfo.NODE_ENV === 'production' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {envInfo.NODE_ENV}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Port:</span>
                    <span className="font-mono">{envInfo.PORT}</span>
                  </div>
                  {envInfo.GOOGLE_CLOUD_PROJECT && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">GCP Project:</span>
                      <span className="font-mono text-sm">{envInfo.GOOGLE_CLOUD_PROJECT}</span>
                    </div>
                  )}
                  {envInfo.GOOGLE_CLOUD_REGION && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-mono">{envInfo.GOOGLE_CLOUD_REGION}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-semibold">ℹ️ Running in {envInfo.NODE_ENV} mode</p>
                </div>
              </div>
            ) : (
              <p className="text-red-600">Failed to load environment information</p>
            )}
          </div>
        </div>

        {/* Success Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg text-white p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Deployment Test Complete!</h3>
          <p className="text-xl mb-6">
            Container is running and responding on PORT environment variable
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✅ Container Build</h4>
              <p className="text-sm opacity-90">Docker image created successfully</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✅ Port Binding</h4>
              <p className="text-sm opacity-90">Server listening on 0.0.0.0:PORT</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✅ Health Checks</h4>
              <p className="text-sm opacity-90">Endpoints responding correctly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
