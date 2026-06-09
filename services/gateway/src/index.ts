import cors from 'cors';
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';

import { initTelemetry } from '@matcha/telemetry';

import { authMiddleware } from './middleware/auth.js';
import { errorHandler } from './middleware/error-handler.js';
import { rateLimiter } from './middleware/rate-limiter.js';
import { requestLogger } from './middleware/request-logger.js';
import { setupRoutes } from './routes/index.js';

const SERVICE_NAME = 'matcha-gateway';
const PORT = process.env.PORT ?? 4000;

const { logger, metrics } = initTelemetry({ serviceName: SERVICE_NAME });

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000', credentials: true }));

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Observability
app.use(requestLogger(logger, metrics));

// Rate limiting (global)
app.use(rateLimiter());

// Auth (extracts JWT claims, does NOT require auth — individual routes opt in)
app.use(authMiddleware());

// Routes
setupRoutes(app);

// Health
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', service: SERVICE_NAME, timestamp: new Date().toISOString() });
});

// Metrics
app.get('/metrics', (_req: Request, res: Response) => {
  res.type('text/plain').send(metrics.getMetrics());
});

// Error handling (must be last)
app.use(errorHandler(logger));

app.listen(PORT, () => {
  logger.info(`${SERVICE_NAME} listening on port ${PORT}`);
});
