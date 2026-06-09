export interface MetricsRegistry {
  counter(name: string, labels?: Record<string, string>): void;
  histogram(name: string, value: number, labels?: Record<string, string>): void;
  gauge(name: string, value: number, labels?: Record<string, string>): void;
  getMetrics(): string;
}

interface MetricEntry {
  name: string;
  type: 'counter' | 'histogram' | 'gauge';
  value: number;
  labels: Record<string, string>;
  timestamp: number;
}

export function createMetrics(serviceName: string): MetricsRegistry {
  const entries: MetricEntry[] = [];

  return {
    counter(name: string, labels: Record<string, string> = {}) {
      const existing = entries.find(
        (e) => e.name === name && e.type === 'counter' && labelsMatch(e.labels, labels),
      );
      if (existing) {
        existing.value++;
      } else {
        entries.push({ name, type: 'counter', value: 1, labels, timestamp: Date.now() });
      }
    },

    histogram(name: string, value: number, labels: Record<string, string> = {}) {
      entries.push({ name, type: 'histogram', value, labels, timestamp: Date.now() });
    },

    gauge(name: string, value: number, labels: Record<string, string> = {}) {
      const existing = entries.find(
        (e) => e.name === name && e.type === 'gauge' && labelsMatch(e.labels, labels),
      );
      if (existing) {
        existing.value = value;
      } else {
        entries.push({ name, type: 'gauge', value, labels, timestamp: Date.now() });
      }
    },

    getMetrics(): string {
      // Prometheus text format
      const lines: string[] = [];
      const grouped = groupBy(entries, 'name');

      for (const [name, metrics] of Object.entries(grouped)) {
        const type = metrics[0].type;
        lines.push(`# TYPE ${serviceName}_${name} ${type}`);
        for (const m of metrics) {
          const labelStr = Object.entries(m.labels)
            .map(([k, v]) => `${k}="${v}"`)
            .join(',');
          const labelPart = labelStr ? `{${labelStr}}` : '';
          lines.push(`${serviceName}_${name}${labelPart} ${m.value}`);
        }
      }
      return lines.join('\n');
    },
  };
}

function labelsMatch(a: Record<string, string>, b: Record<string, string>): boolean {
  const keysA = Object.keys(a).sort();
  const keysB = Object.keys(b).sort();
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k, i) => k === keysB[i] && a[k] === b[k]);
}

function groupBy(arr: MetricEntry[], key: keyof MetricEntry): Record<string, MetricEntry[]> {
  return arr.reduce(
    (acc, item) => {
      const group = String(item[key]);
      acc[group] = acc[group] ?? [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, MetricEntry[]>,
  );
}
