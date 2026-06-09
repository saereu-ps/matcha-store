export interface ValidationError {
  field: string;
  code: string;
  message: string;
  params?: Record<string, unknown>;
}

export class ProblemDetail extends Error {
  constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly status: number,
    public readonly detail: string,
    public readonly instance?: string,
    public readonly correlationId?: string,
    public readonly errors?: ValidationError[],
    public readonly localized?: { title: string; detail: string },
  ) {
    super(detail);
    this.name = 'ProblemDetail';
  }

  toJSON(): Record<string, unknown> {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      detail: this.detail,
      instance: this.instance,
      correlationId: this.correlationId,
      timestamp: new Date().toISOString(),
      ...(this.errors && { errors: this.errors }),
      ...(this.localized && { localized: this.localized }),
    };
  }

  toHttpResponse(): { status: number; body: Record<string, unknown> } {
    return {
      status: this.status,
      body: this.toJSON(),
    };
  }
}
