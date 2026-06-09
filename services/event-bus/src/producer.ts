import type { DomainEvent, EventMetadata } from '@matcha/shared-kernel';
import { randomUUID } from 'node:crypto';

export interface ProducerConfig {
  brokers: string[];
  clientId: string;
}

export interface EventProducer {
  publish<T>(topic: string, event: Omit<DomainEvent<T>, 'eventId' | 'timestamp'>): Promise<void>;
  disconnect(): Promise<void>;
}

/**
 * Create a Kafka event producer.
 * Wraps events with ID and timestamp, validates against schema registry.
 *
 * Full implementation uses kafkajs + confluent-schema-registry.
 * This provides the interface and local/test implementation.
 */
export function createProducer(config: ProducerConfig): EventProducer {
  const publishedEvents: DomainEvent[] = [];

  return {
    async publish<T>(topic: string, partialEvent: Omit<DomainEvent<T>, 'eventId' | 'timestamp'>) {
      const event: DomainEvent<T> = {
        ...partialEvent,
        eventId: randomUUID(),
        timestamp: new Date().toISOString(),
      };

      // In production: serialize with Avro, validate schema, produce to Kafka topic
      publishedEvents.push(event as DomainEvent);

      // Log for development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[EventBus] Published to ${topic}:`, event.eventType, event.eventId);
      }
    },

    async disconnect() {
      // In production: flush pending messages, disconnect Kafka producer
    },
  };
}

/**
 * Helper to create a DomainEvent payload with standard metadata.
 */
export function createEventPayload<T>(
  eventType: string,
  source: string,
  payload: T,
  metadata: Partial<EventMetadata> & { traceId: string },
): Omit<DomainEvent<T>, 'eventId' | 'timestamp'> {
  return {
    eventType,
    source,
    correlationId: metadata.traceId,
    causationId: metadata.traceId,
    version: 1,
    payload,
    metadata: {
      traceId: metadata.traceId,
      userId: metadata.userId,
      tenantId: metadata.tenantId,
    },
  };
}
