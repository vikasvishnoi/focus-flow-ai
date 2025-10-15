# FocusFlow AI

A gamified therapeutic tool designed to improve visual tracking and attention skills for children with special needs.

## Project Structure

```
focusflow-ai/
├── frontend/          # Next.js PWA with game UI and eye-tracking
├── backend/           # AWS Lambda functions and API handlers
└── infra/            # Infrastructure as Code (coming soon)
```

## Frontend

Next.js 14 Progressive Web App with:
- Three game levels (Beginner, Mid-Level, Pro)
- WebGazer.js eye-tracking integration
- Real-time gaze data collection
- Session recording

### Running Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

AWS serverless architecture with:
- API Gateway endpoints
- Lambda functions for data ingestion and analysis
- Bedrock Agent for AI-powered insights
- DynamoDB for session storage

(Coming in next iteration)

## Infra

Infrastructure as Code for AWS deployment

(Coming in next iteration)
