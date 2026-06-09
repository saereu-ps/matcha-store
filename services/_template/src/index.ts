import express from 'express';

import { initTelemetry } from '@matcha/telemetry';

const SERVICE_NAME = '{{SERVICE_NAME}}';
const PORT = process.env.PORT ?? 3000;

const { logger, metrics } = initTelemetry({ serviceName: SERVICE_NAME });

const app = express();
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
});

// Metrics endpoint
app.get('/metrics', (_req, res) => {
  res.type('text/plain').send(metrics.getMetrics());
});

app.listen(PORT, () => {
  logger.info(`${SERVICE_NAME} listening on port ${PORT}`);
});
