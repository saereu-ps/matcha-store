// Value Objects
export { CurrencyCode } from './value-objects/currency-code';
export { Email } from './value-objects/email';
export { FlavorVector } from './value-objects/flavor-vector';
export { Grade } from './value-objects/grade';
export { OrderId, ProductId, SubscriptionId, UserId } from './value-objects/identifiers';
export { Locale } from './value-objects/locale';
export { Money } from './value-objects/money';
export { SKU } from './value-objects/sku';

// Events
export type { DomainEvent, EventMetadata } from './events/domain-event';
export type { EventBus } from './events/event-bus';

// Errors
export { ErrorCodes, createError } from './errors/error-factory';
export { ProblemDetail } from './errors/problem-detail';
export type { ValidationError } from './errors/problem-detail';

// Auth
export { extractClaims, verifyJwt } from './auth/jwt';
export { requirePermission, requireRole } from './auth/rbac';
export type { AuthContext, JwtClaims } from './auth/types';

// Result
export { Err, Ok, type Result } from './result/result';

