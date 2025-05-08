# MYFO Test Server

A modern Express.js server built with TypeScript.

## Features

- Express.js with TypeScript
- ESLint for code quality
- JWT Authentication
- TypeScript Path Aliases
- Prisma Postgres for structured data
- Jest for testing
- Docker support
- GitHub Actions for CI/CD

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Docker

```bash
# Build Docker image
docker build -t myfo-test-server .

# Run Docker container
docker run -p 3000:3000 myfo-test-server
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api` - API root endpoint
- `GET /api/v1/accounts` - Account details (JWT authentication required)
- `POST /api/v1/auth/login` - Get Auth Token

## Project Structure

```
src/
  ├── controllers/    # Route controllers
  ├── middleware/     # Custom middleware including JWT authentication
  ├── prisma/         # Data models
  ├── routes/         # API routes
  │   └── v1/         # Version 1 API routes
  │       ├── accounts/  # Account endpoints
  │       └── auth/      # Authentication endpoints
  ├── utils/          # Utility functions (like logger)
  ├── config.ts       # Configuration
  ├── index.ts        # App entry point
  └── index.test.ts   # Main tests
```

## Completed Setup Checklist

- [x] Initialize Node.js project with Express
- [x] Set up TypeScript configuration
- [x] Configure ESLint for code quality
- [x] Create basic server structure
- [x] Add health check and API endpoints
- [x] Set up Jest for testing
- [x] Write and verify tests
- [x] Dockerize the application
- [x] Verify Docker container works
- [x] Set up GitHub Actions workflow
- [x] Create project documentation
- [x] Add JWT authentication
- [x] Configure TypeScript path aliases
- [x] Add logging utilities

## Next Steps

- [ ] Add additional API routes
- [ ] Implement Prisma PostgreSQL database integration
- [ ] Set up environment variables management
- [ ] Enhance error handling & logging
- [ ] AWS + Terraform IaC
