# Cloud Run Test Application

## Overview

This is a full-stack web application designed specifically for testing deployment to Google Cloud Run. It demonstrates proper Cloud Run configuration with a React frontend, Express.js backend, and PostgreSQL database integration using Drizzle ORM. The application includes comprehensive monitoring, health checks, and deployment examples.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom Google-themed color palette
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with health monitoring
- **Development**: Hot reload with Vite middleware in development
- **Production**: Compiled to ES modules with esbuild

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon serverless driver for edge compatibility

## Key Components

### Health Monitoring System
- **Health Check Endpoint**: `/health` - Required for Cloud Run monitoring
- **Server Info API**: `/api/server-info` - Real-time server status and metrics
- **Environment API**: `/api/environment` - Safe environment variable exposure
- **Real-time Updates**: Automatic refresh every 10-30 seconds

### Cloud Run Compatibility Layer
- **Port Handling**: Dynamic PORT environment variable binding
- **Signal Handling**: Graceful SIGTERM shutdown for container lifecycle
- **Host Binding**: 0.0.0.0 binding for container networking
- **Health Checks**: Comprehensive status reporting for load balancer

### User Interface Components
- **Status Dashboard**: Real-time server metrics and health indicators
- **Configuration Examples**: Interactive code samples for deployment
- **Troubleshooting Guide**: Built-in deployment help and diagnostics
- **Google Theme**: Material Design inspired styling with Google brand colors

### Development Tools
- **Replit Integration**: Cartographer plugin and runtime error overlay
- **Hot Reload**: Vite development server with Express middleware
- **TypeScript**: Full type safety across frontend and backend
- **Path Aliases**: Organized imports with @ prefixes

## Data Flow

### Request Lifecycle
1. **Client Request**: React components make API calls via TanStack Query
2. **Express Routing**: Server routes handle API endpoints and health checks
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with error handling middleware
5. **Real-time Updates**: Polling-based updates for live monitoring data

### Development Flow
1. **Hot Reload**: Vite watches frontend changes, Express restarts on backend changes
2. **Type Checking**: TypeScript validates types across shared schemas
3. **Database Schema**: Drizzle generates types from PostgreSQL schema
4. **Build Process**: Vite builds frontend, esbuild compiles backend

### Production Flow
1. **Static Assets**: Frontend built to `dist/public` directory
2. **Server Bundle**: Backend compiled to `dist/index.js`
3. **Asset Serving**: Express serves static files in production
4. **Health Monitoring**: Continuous health checks and metrics collection

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **express**: Web application framework for Node.js
- **react**: Frontend UI library with TypeScript support

### UI and Styling Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for consistent iconography
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **esbuild**: Fast JavaScript bundler for production
- **tsx**: TypeScript execution for development

### Cloud Run Dependencies
- **Health Check Requirements**: Standard HTTP health endpoint
- **Port Configuration**: Dynamic PORT environment variable
- **Signal Handling**: SIGTERM graceful shutdown
- **Container Networking**: 0.0.0.0 host binding

## Deployment Strategy

### Google Cloud Run Deployment
- **Source Deployment**: Direct deployment from Git repository
- **Container Configuration**: Automatic containerization with Cloud Build
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Scaling**: Automatic scaling based on request volume
- **Health Checks**: Built-in health monitoring and restart policies

### Build Configuration
- **Frontend Build**: Vite produces optimized static assets
- **Backend Build**: esbuild creates single-file Node.js bundle
- **Asset Strategy**: Express serves static files from dist/public
- **Production Mode**: NODE_ENV=production for optimized runtime

### Database Strategy
- **Neon Integration**: Serverless PostgreSQL with edge compatibility
- **Schema Management**: Drizzle migrations for database versioning
- **Connection Pooling**: Built-in connection management
- **Type Safety**: Generated types from database schema

### Monitoring Strategy
- **Health Endpoints**: Multiple monitoring endpoints for different metrics
- **Real-time Dashboard**: Built-in web interface for system status
- **Error Handling**: Comprehensive error catching and reporting
- **Environment Inspection**: Safe exposure of relevant configuration