import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint - REQUIRED for Google Cloud Run
  app.get('/health', (req, res) => {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      port: process.env.PORT || '5000',
      platform: 'Google Cloud Run',
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.status(200).json(healthData);
  });

  // API endpoint to get server information
  app.get('/api/server-info', (req, res) => {
    const serverInfo = {
      port: process.env.PORT || '5000',
      hostname: '0.0.0.0',
      uptime: Math.floor(process.uptime()),
      platform: 'Google Cloud Run',
      nodeVersion: process.version,
      region: process.env.GOOGLE_CLOUD_REGION || 'us-central1',
      service: process.env.K_SERVICE || 'cloud-run-test-app',
      revision: process.env.K_REVISION || 'unknown',
      configuration: process.env.K_CONFIGURATION || 'unknown',
      timestamp: new Date().toISOString()
    };
    
    res.json(serverInfo);
  });

  // API endpoint to get environment variables (safe ones only)
  app.get('/api/environment', (req, res) => {
    const safeEnvVars = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
      GOOGLE_CLOUD_REGION: process.env.GOOGLE_CLOUD_REGION,
      K_SERVICE: process.env.K_SERVICE,
      K_REVISION: process.env.K_REVISION,
      K_CONFIGURATION: process.env.K_CONFIGURATION,
      GAE_APPLICATION: process.env.GAE_APPLICATION,
      GAE_DEPLOYMENT_ID: process.env.GAE_DEPLOYMENT_ID,
      GAE_ENV: process.env.GAE_ENV,
      GAE_INSTANCE: process.env.GAE_INSTANCE,
      GAE_MEMORY_MB: process.env.GAE_MEMORY_MB,
      GAE_RUNTIME: process.env.GAE_RUNTIME,
      GAE_SERVICE: process.env.GAE_SERVICE,
      GAE_VERSION: process.env.GAE_VERSION
    };
    
    // Filter out undefined values
    const filteredEnvVars = Object.fromEntries(
      Object.entries(safeEnvVars).filter(([_, value]) => value !== undefined)
    );
    
    res.json(filteredEnvVars);
  });

  const httpServer = createServer(app);

  return httpServer;
}
