export interface EventMetadata {
  userId?: string;
  tenantId?: string;
  traceId: string;
}

export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: string;
  source: string;
  timestamp: string;
  correlationId: string;
  causationId: string;
  version: number;
  payload: T;
  metadata: EventMetadata;
}
