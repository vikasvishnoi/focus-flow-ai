# FocusFlow AI - Backend

AWS serverless backend for processing eye-tracking data and generating AI-powered insights.

## Architecture

```
API Gateway → Lambda (Ingestor) → S3
                                    ↓
                          Lambda (Trigger) → Bedrock Agent
                                                    ↓
                                                DynamoDB
```

## Components

### Data Ingestor Lambda
- Receives session data from frontend
- Stores raw data in S3

### Analysis Trigger Lambda
- Triggered by S3 events
- Invokes Bedrock Agent for analysis

### Bedrock Agent
- Calculates performance metrics
- Compares against benchmarks
- Generates natural language reports

### Metrics Calculator Lambda
- Tool for Bedrock Agent
- Computes tracking accuracy, focus scores, etc.

## Coming Soon

Lambda functions, API definitions, and deployment scripts will be added in the next iteration.
