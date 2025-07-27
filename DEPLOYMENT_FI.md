# Google Cloud Run Deployment Ohje

## Ongelma ja ratkaisu

Jos deployment epäonnistuu virheeseen "Container failed to start and listen on the port", syy on yleensä että GitHub repositoryssa on vanha Dockerfile.

## Korjaus

1. **Päivitä Dockerfile GitHubissa** seuraavalla sisällöllä:

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

2. **Tärkeä muutos**: Rivi `RUN npm ci && npm cache clean --force` (ei `--only=production`)

3. **Commit muutokset** GitHubissa

4. **Kokeile deploymenttiä uudelleen**

## Deployment komennot

### Cloud Run Console:
- Source repository: GitHub repository
- Branch: main/master  
- Build type: Dockerfile
- Region: europe-west1 (Belgia)

### Gcloud CLI:
```bash
gcloud run deploy googletest \
  --source . \
  --region=europe-west1 \
  --allow-unauthenticated
```

## Testaus

Kun deployment onnistuu:
- Siirry sovelluksen URL:iin
- Testaa `/health` endpoint
- Kokeile "Check Health Status" nappia
- Kokeila "View Environment Info" nappia

## Troubleshooting

Jos deployment vielä epäonnistuu:
1. Varmista että GitHub repository on päivitetty uudella Dockerfile:lla
2. Tarkista Cloud Build logit
3. Varmista että `package.json` sisältää `"start": "node dist/index.js"` scriptin

## Sovelluksen ominaisuudet

- Express.js backend TypeScript:llä
- React frontend Vite:llä  
- Health check endpoint `/health`
- Server status monitoring
- Environment variables näkymä
- Google Cloud Run optimoitu