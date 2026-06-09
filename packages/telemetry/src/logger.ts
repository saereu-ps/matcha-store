export interface Logger {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
  debug(message: string, context?: Record<string, unknown>): void;
  child(bindings: Record<string, unknown>): Logger;
}

interface LogEntry {
  level: string;
  message: string;
  service: string;
  timestamp: string;
  traceId?: string;
  spanId?: string;
  correlationId?: string;
  [key: string]: unknown;
}

export function createLogger(service: string, options?: { level?: string }): Logger {
  const level = options?.level ?? process.env.LOG_LEVEL ?? 'info';
  const levels = ['debug', 'info', 'warn', 'error'];
  const minLevel = levels.indexOf(level);

  function shouldLog(logLevel: string): boolean {
    return levels.indexOf(logLevel) >= minLevel;
  }

  function log(logLevel: string, message: string, context?: Record<string, unknown>): void {
    if (!shouldLog(logLevel)) return;

    const entry: LogEntry = {
      level: logLevel,
      message,
      service,
      timestamp: new Date().toISOString(),
      ...context,
    };

    const output = JSON.stringify(entry);
    if (logLevel === 'error') {
      process.stderr.write(output + '\n');
    } else {
      process.stdout.write(output + '\n');
    }
  }

  const logger: Logger = {
    info: (msg, ctx) => log('info', msg, ctx),
    warn: (msg, ctx) => log('warn', msg, ctx),
    error: (msg, ctx) => log('error', msg, ctx),
    debug: (msg, ctx) => log('debug', msg, ctx),
    child: (bindings) => createLogger(service, { level, ...bindings } as { level: string }),
  };

  return logger;
}
