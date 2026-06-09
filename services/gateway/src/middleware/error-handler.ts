import { ProblemDetail } from '@matcha/shared-kernel';
import type { Logger } from '@matcha/telemetry';
import type { NextFunction, Request, Response } from 'express';

/**
 * Global error handler — catches all unhandled errors.
 * Converts ProblemDetail instances to proper RFC 7807 responses.
 * Logs unexpected errors and returns generic 500 for unknown errors.
 */
export function errorHandler(logger: Logger) {
  return (err: Error, req: Request, res: Response, _next: NextFunction): void => {
    const correlationId = req.headers['x-correlation-id'] as string;

    if (err instanceof ProblemDetail) {
      res.status(err.status).json(err.toJSON());
      return;
    }

    // Unexpected error
    logger.error('unhandled error', {
      correlationId,
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      type: '/errors/internal',
      title: 'Internal Server Error',
      status: 500,
      detail: 'An unexpected error occurred',
      correlationId,
      timestamp: new Date().toISOString(),
    });
  };
}
