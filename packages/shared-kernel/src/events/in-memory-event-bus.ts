import type { DomainEvent } from './domain-event';
import type { EventBus, EventHandler } from './event-bus';

export class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, Set<EventHandler>>();
  private publishedEvents: DomainEvent[] = [];

  async publish<T>(event: DomainEvent<T>): Promise<void> {
    this.publishedEvents.push(event as DomainEvent);
    const handlers = this.handlers.get(event.eventType);
    if (handlers) {
      for (const handler of handlers) {
        await handler(event as DomainEvent);
      }
    }
  }

  subscribe<T>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler as EventHandler);
  }

  unsubscribe(eventType: string, handler: EventHandler): void {
    this.handlers.get(eventType)?.delete(handler);
  }

  // Test helpers
  getPublishedEvents(): DomainEvent[] {
    return [...this.publishedEvents];
  }

  getPublishedEventsOfType(type: string): DomainEvent[] {
    return this.publishedEvents.filter((e) => e.eventType === type);
  }

  clear(): void {
    this.publishedEvents = [];
    this.handlers.clear();
  }
}
