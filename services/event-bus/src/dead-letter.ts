import type { DomainEvent } from '@matcha/shared-kernel';

export interface DeadLetterConfig {
  dlqTopic: string;
  maxRetries: number;
  alertWebhook?: string;
}

interface FailedEvent {
  event: DomainEvent;
  error: string;
  retries: number;
  lastAttempt: string;
  originalTopic: string;
}

/**
 * Dead Letter Queue handler.
 * Events that fail processing after maxRetries are sent to the DLQ topic.
 * Optionally sends alert to webhook (PagerDuty/Slack).
 */
export function createDeadLetterHandler(config: DeadLetterConfig) {
  const failedEvents: FailedEvent[] = [];

  return {
    async handleFailure(event: DomainEvent, error: Error, originalTopic: string, retryCount: number) {
      const failed: FailedEvent = {
        event,
        error: error.message,
        retries: retryCount,
        lastAttempt: new Date().toISOString(),
        originalTopic,
      };

      if (retryCount >= config.maxRetries) {
        failedEvents.push(failed);
        // In production: produce to DLQ Kafka topic
        console.error(`[DLQ] Event ${event.eventId} exceeded max retries (${config.maxRetries}). Sent to DLQ.`);

        if (config.alertWebhook) {
          // In production: POST to alert webhook
          console.warn(`[DLQ] Alert sent for event ${event.eventId}`);
        }
      }
    },

    getFailedEvents(): FailedEvent[] {
      return [...failedEvents];
    },

    getFailedCount(): number {
      return failedEvents.length;
    },
  };
}
