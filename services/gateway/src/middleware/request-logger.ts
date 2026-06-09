import type { Logger, MetricsRegistry } from '@matcha/telemetry';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

/**
 * Request logging middleware — structured JSON logs + metrics.
 * Adds correlationId to every request for distributed tracing.
 */
export function requestLogger(logger: Logger, metrics: MetricsRegistry) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    const correlationId = (req.headers['x-correlation-id'] as string) ?? randomUUID();

    // Attach correlation ID to request and response
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const labels = {
        method: req.method,
        path: req.route?.path ?? req.path,
        status: String(res.statusCode),
      };

      metrics.histogram('http_request_duration_ms', duration, labels);
      metrics.counter('http_requests_total', labels);

      logger.info('request completed', {
        correlationId,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration,
        userAgent: req.headers['user-agent'],
        userId: req.auth?.userId,
      });
    });

    next();
  };
}
