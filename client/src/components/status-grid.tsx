import { useQuery } from "@tanstack/react-query";

interface ServerInfo {
  port: string;
  hostname: string;
  uptime: number;
  platform: string;
  nodeVersion: string;
  region: string;
  service: string;
  revision: string;
  timestamp: string;
}

interface EnvInfo {
  NODE_ENV?: string;
  PORT?: string;
  GOOGLE_CLOUD_PROJECT?: string;
  GOOGLE_CLOUD_REGION?: string;
  K_SERVICE?: string;
  K_REVISION?: string;
  [key: string]: string | undefined;
}

interface StatusGridProps {
  serverInfo?: ServerInfo;
  envInfo?: EnvInfo;
}

export default function StatusGrid({ serverInfo, envInfo }: StatusGridProps) {
  const { data: healthData } = useQuery({
    queryKey: ['/health'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const formatUptime = (uptime?: number) => {
    if (!uptime) return "00:00:00";
    
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isHealthy = healthData?.status === 'healthy';

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Server Status */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Server Status</h3>
          <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Port</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {serverInfo?.port || envInfo?.PORT || '5000'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Host</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {serverInfo?.hostname || '0.0.0.0'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Uptime</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {formatUptime(serverInfo?.uptime)}
            </span>
          </div>
        </div>
      </div>

      {/* Deployment Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Deployment</h3>
          <svg className="w-5 h-5 text-google-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Platform</span>
            <span className="text-sm font-medium">
              {serverInfo?.platform || 'Google Cloud Run'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Runtime</span>
            <span className="text-sm font-medium">
              {serverInfo?.nodeVersion ? `Node.js ${serverInfo.nodeVersion.replace('v', '')}` : 'Node.js 20'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Region</span>
            <span className="text-sm font-medium">
              {serverInfo?.region || envInfo?.GOOGLE_CLOUD_REGION || 'us-central1'}
            </span>
          </div>
        </div>
      </div>

      {/* Health Check */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Health Check</h3>
          <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Endpoint</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">/health</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className={`text-sm font-medium ${isHealthy ? 'text-green-600' : 'text-yellow-600'}`}>
              {healthData?.status || 'Checking...'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Response Time</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">~15ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
