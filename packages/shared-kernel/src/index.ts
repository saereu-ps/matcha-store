// Value Objects
export { CurrencyCode } from './value-objects/currency-code.js';
export { Email } from './value-objects/email.js';
export { FlavorVector } from './value-objects/flavor-vector.js';
export { Grade } from './value-objects/grade.js';
export { OrderId, ProductId, SubscriptionId, UserId } from './value-objects/identifiers.js';
export { Locale } from './value-objects/locale.js';
export { Money } from './value-objects/money.js';
export { SKU } from './value-objects/sku.js';

// Events
export type { DomainEvent, EventMetadata } from './events/domain-event.js';
export type { EventBus } from './events/event-bus.js';

// Errors
export { ErrorCodes, createError } from './errors/error-factory.js';
export { ProblemDetail } from './errors/problem-detail.js';
export type { ValidationError } from './errors/problem-detail.js';

// Auth
export { extractClaims, verifyJwt } from './auth/jwt.js';
export { requirePermission, requireRole } from './auth/rbac.js';
export type { AuthContext, JwtClaims } from './auth/types.js';

// Result
export { Err, Ok, type Result } from './result/result.js';

