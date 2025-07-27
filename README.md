# Google Cloud Run Test Application

A minimal Express.js application specifically designed to deploy successfully from GitHub to Google Cloud Run. This application demonstrates proper Cloud Run configuration, including PORT environment variable handling and container runtime contract compliance.

## 🎯 Features

- ✅ **Cloud Run Compatible**: Proper PORT environment variable handling
- ✅ **Health Check Endpoint**: Required for Cloud Run monitoring  
- ✅ **Graceful Shutdown**: Handles SIGTERM signals properly
- ✅ **Docker Optimized**: Alpine Linux with proper build process
- ✅ **GitHub Actions**: Automated CI/CD pipeline
- ✅ **Real-time Monitoring**: Server status and environment information
- ✅ **Security**: Non-root user, minimal dependencies
- ✅ **TypeScript**: Full-stack TypeScript with React frontend

## 🚀 Quick Deploy to Cloud Run

### Method 1: Deploy from Source (Recommended)
```bash
# Clone the repository
git clone https://github.com/Magedius/Googletest.git
cd Googletest

# Deploy directly from source
gcloud run deploy googletest \
  --source . \
  --region=europe-west1 \
  --allow-unauthenticated
