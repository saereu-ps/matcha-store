import { initTelemetry } from '@matcha/telemetry';
import express from 'express';
import { adminRoutes } from './api/routes.js';

const SERVICE_NAME = 'matcha-admin';
const PORT = process.env.PORT ?? 4009;
const { logger, metrics } = initTelemetry({ serviceName: SERVICE_NAME });

const app = express();
app.use(express.json());
app.use('/admin', adminRoutes);
app.get('/health', (_req, res) => { res.json({ status: 'healthy', service: SERVICE_NAME, timestamp: new Date().toISOString() }); });
app.get('/metrics', (_req, res) => { res.type('text/plain').send(metrics.getMetrics()); });
app.listen(PORT, () => { logger.info(`${SERVICE_NAME} listening on port ${PORT}`); });
export { app };
