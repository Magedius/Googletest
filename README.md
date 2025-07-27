# Google Cloud Run Test Application

A minimal Express.js application specifically designed to deploy successfully from GitHub to Google Cloud Run. This application demonstrates proper Cloud Run configuration, including PORT environment variable handling and container runtime contract compliance.

## 🎯 Features

- ✅ **Cloud Run Compatible**: Proper PORT environment variable handling
- ✅ **Health Check Endpoint**: Required for Cloud Run monitoring
- ✅ **Graceful Shutdown**: Handles SIGTERM signals properly
- ✅ **Docker Optimized**: Multi-stage builds with Alpine Linux
- ✅ **GitHub Actions**: Automated CI/CD pipeline
- ✅ **Real-time Monitoring**: Server status and environment information
- ✅ **Security**: Non-root user, minimal dependencies

## 🚀 Quick Deploy to Cloud Run

### Method 1: Deploy from Source (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd cloud-run-test-app

# Deploy directly from source
gcloud run deploy cloud-run-test-app \
  --source . \
  --region=us-central1 \
  --allow-unauthenticated
