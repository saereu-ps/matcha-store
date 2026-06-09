import { randomUUID } from 'node:crypto';

export interface Span {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  operationName: string;
  startTime: number;
  endTime?: number;
  attributes: Record<string, unknown>;
  end(): void;
  setAttribute(key: string, value: unknown): void;
  setError(error: Error): void;
}

export interface Tracer {
  startSpan(operationName: string, parentSpan?: Span): Span;
  getActiveSpan(): Span | undefined;
}

export function createTracer(serviceName: string): Tracer {
  let activeSpan: Span | undefined;

  function createSpan(operationName: string, parentSpan?: Span): Span {
    const span: Span = {
      traceId: parentSpan?.traceId ?? randomUUID(),
      spanId: randomUUID().slice(0, 16),
      parentSpanId: parentSpan?.spanId,
      operationName,
      startTime: Date.now(),
      attributes: { 'service.name': serviceName },
      end() {
        this.endTime = Date.now();
        activeSpan = parentSpan;
        // In production: export span to Jaeger/OTLP collector
      },
      setAttribute(key: string, value: unknown) {
        this.attributes[key] = value;
      },
      setError(error: Error) {
        this.attributes['error'] = true;
        this.attributes['error.message'] = error.message;
        this.attributes['error.stack'] = error.stack;
      },
    };
    activeSpan = span;
    return span;
  }

  return {
    startSpan: createSpan,
    getActiveSpan: () => activeSpan,
  };
}
