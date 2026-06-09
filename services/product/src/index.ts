import express from 'express';

import { initTelemetry } from '@matcha/telemetry';

import { productRoutes } from './api/routes.js';

const SERVICE_NAME = 'matcha-product';
const PORT = process.env.PORT ?? 4001;

const { logger, metrics } = initTelemetry({ serviceName: SERVICE_NAME });

const app = express();
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: SERVICE_NAME, timestamp: new Date().toISOString() });
});

// Metrics
app.get('/metrics', (_req, res) => {
  res.type('text/plain').send(metrics.getMetrics());
});

app.listen(PORT, () => {
  logger.info(`${SERVICE_NAME} listening on port ${PORT}`);
});

export { app };
