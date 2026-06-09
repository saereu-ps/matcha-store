import type { DomainEvent } from './domain-event.js';

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => Promise<void>;

export interface EventBus {
  publish<T>(event: DomainEvent<T>): Promise<void>;
  subscribe<T>(eventType: string, handler: EventHandler<T>): void;
  unsubscribe(eventType: string, handler: EventHandler): void;
}
