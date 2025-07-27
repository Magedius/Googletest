# GitHub Repository Update Instructions

Seuraavat tiedostot täytyy päivittää GitHub repositoryyn (https://github.com/Magedius/Googletest) jotta Cloud Run deployment toimii:

## 1. KRIITTINEN: Dockerfile (PAKOLLINEN)

**Tiedosto**: `Dockerfile`
**Toimenpide**: Korvaa koko sisältö

```dockerfile
# Use Node.js 20 LTS Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# Copy application code
COPY . ./

# Build the frontend (needs dev dependencies)
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --omit=dev

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /usr/src/app

# Switch to non-root user
USER nextjs

# Expose port (this is just documentation, Cloud Run uses PORT env var)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:' + (process.env.PORT || 8080) + '/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => { process.exit(1); });"

# Start the application
CMD ["npm", "start"]
```

## 2. Puuttuvat React-komponentit (KRIITTISTÄ lisätä)

Sovellus kaatuu käynnistyessä koska GitHub repositoryssa puuttuvat komponentit. Lisää nämä tiedostot:

### client/src/components/welcome-hero.tsx (UUS TIEDOSTO)

```typescript
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function WelcomeHero() {
  const { toast } = useToast();

  const checkHealth = async () => {
    try {
      const response = await fetch('/health');
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Health Check Successful",
          description: `Server is healthy. Uptime: ${Math.floor(data.uptime)}s`,
        });
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      toast({
        title: "Health Check Failed",
        description: "Could not reach health endpoint",
        variant: "destructive",
      });
    }
  };

  const showEnvironment = async () => {
    try {
      const response = await fetch('/api/environment');
      const data = await response.json();
      
      const envString = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      
      toast({
        title: "Environment Variables",
        description: envString || "No environment variables found",
      });
    } catch (error) {
      toast({
        title: "Environment Check Failed",
        description: "Could not fetch environment variables",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-google-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-google-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Cloud Run Test Application</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          This simple application demonstrates proper Google Cloud Run deployment configuration, 
          including PORT environment variable handling and container runtime contract compliance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={checkHealth} className="bg-google-blue text-white hover:bg-blue-600">
            Check Health Status
          </Button>
          <Button onClick={showEnvironment} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            View Environment Info
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### client/src/components/config-examples.tsx (UUS TIEDOSTO)

```typescript
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
          <pre className="text-gray-800"><code>{\`// server.js - Cloud Run Compatible
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
  console.log(\\\`Server running on \\\${hostname}:\\\${port}\\\`);
});\`}</code></pre>
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
```

## 3. Päivitetty status-grid.tsx

**Tiedosto**: `client/src/components/status-grid.tsx`
**Toimenpide**: Korvaa koko sisältö tiedostolla jossa on HealthInfo-interface ja oikeat tyypit

## 4. Deployment ohje (valinnainen)

**Tiedosto**: `DEPLOYMENT_FI.md` (UUS TIEDOSTO)

## TÄRKEINTÄ:

1. **Dockerfile on PAKOLLINEN päivittää** - ilman sitä deployment ei toimi
2. React-komponentit täytyy lisätä jotta sovellus latautuu
3. Kun nämä on päivitetty GitHubissa, kokeile Cloud Run deploymenttiä uudelleen

## Cloud Run deployment komento päivityksen jälkeen:

```bash
gcloud run deploy googletest \
  --source . \
  --region=europe-west1 \
  --allow-unauthenticated
```