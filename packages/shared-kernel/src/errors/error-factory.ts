import { ProblemDetail, type ValidationError } from './problem-detail.js';

export const ErrorCodes = {
  INVALID_REQUEST: 'MATCHA-001',
  AUTH_REQUIRED: 'MATCHA-002',
  FORBIDDEN: 'MATCHA-003',
  NOT_FOUND: 'MATCHA-004',
  CONFLICT: 'MATCHA-005',
  VALIDATION_FAILED: 'MATCHA-006',
  RATE_LIMITED: 'MATCHA-007',
  INTERNAL: 'MATCHA-008',
  SERVICE_UNAVAILABLE: 'MATCHA-009',
  PAYMENT_REQUIRED: 'MATCHA-010',
} as const;

interface ErrorOptions {
  detail?: string;
  instance?: string;
  correlationId?: string;
  errors?: ValidationError[];
}

export function createError(code: keyof typeof ErrorCodes, options: ErrorOptions = {}): ProblemDetail {
  const configs: Record<string, { status: number; title: string; type: string }> = {
    INVALID_REQUEST: { status: 400, title: 'Invalid Request', type: '/errors/invalid-request' },
    AUTH_REQUIRED: { status: 401, title: 'Authentication Required', type: '/errors/auth-required' },
    FORBIDDEN: { status: 403, title: 'Forbidden', type: '/errors/forbidden' },
    NOT_FOUND: { status: 404, title: 'Not Found', type: '/errors/not-found' },
    CONFLICT: { status: 409, title: 'Conflict', type: '/errors/conflict' },
    VALIDATION_FAILED: { status: 422, title: 'Validation Failed', type: '/errors/validation' },
    RATE_LIMITED: { status: 429, title: 'Rate Limited', type: '/errors/rate-limited' },
    INTERNAL: { status: 500, title: 'Internal Error', type: '/errors/internal' },
    SERVICE_UNAVAILABLE: { status: 503, title: 'Service Unavailable', type: '/errors/unavailable' },
    PAYMENT_REQUIRED: { status: 402, title: 'Payment Required', type: '/errors/payment-required' },
  };

  const config = configs[code];
  return new ProblemDetail(
    config.type,
    config.title,
    config.status,
    options.detail ?? config.title,
    options.instance,
    options.correlationId,
    options.errors,
  );
}
