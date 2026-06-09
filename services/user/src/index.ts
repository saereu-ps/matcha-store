import { initTelemetry } from '@matcha/telemetry';
import express from 'express';
import { journalRoutes } from './api/journal.js';
import { profileRoutes } from './api/profile.js';
import { referralRoutes } from './api/referrals.js';
import { reviewRoutes } from './api/reviews.js';

const SERVICE_NAME = 'matcha-user';
const PORT = process.env.PORT ?? 4002;
const { logger, metrics } = initTelemetry({ serviceName: SERVICE_NAME });

const app = express();
app.use(express.json());

app.use('/users/profile', profileRoutes);
app.use('/users/journal', journalRoutes);
app.use('/users/reviews', reviewRoutes);
app.use('/users/referrals', referralRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: SERVICE_NAME, timestamp: new Date().toISOString() });
});
app.get('/metrics', (_req, res) => { res.type('text/plain').send(metrics.getMetrics()); });

app.listen(PORT, () => { logger.info(`${SERVICE_NAME} listening on port ${PORT}`); });
export { app };
