import { createLogger, type Logger } from './logger.js';
import { createMetrics, type MetricsRegistry } from './metrics.js';
import { createTracer, type Tracer } from './tracer.js';

export interface TelemetryConfig {
  serviceName: string;
  logLevel?: string;
  enableTracing?: boolean;
  enableMetrics?: boolean;
}

interface Telemetry {
  logger: Logger;
  tracer: Tracer;
  metrics: MetricsRegistry;
}

export function initTelemetry(config: TelemetryConfig): Telemetry {
  const logger = createLogger(config.serviceName, { level: config.logLevel });
  const tracer = createTracer(config.serviceName);
  const metrics = createMetrics(config.serviceName);

  logger.info('Telemetry initialized', {
    service: config.serviceName,
    tracing: config.enableTracing ?? true,
    metrics: config.enableMetrics ?? true,
  });

  return { logger, tracer, metrics };
}
