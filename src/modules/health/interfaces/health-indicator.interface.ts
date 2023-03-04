import type { HealthIndicatorResult } from '@nestjs/terminus';

export interface IHealthIndicator {
  name: string;
  callMetrics: any;
  customMetricsRegistered: boolean;
  customGaugesRegistered: boolean;
  updatePrometheusData(isConnected: boolean): void;
  isHealthy(): Promise<HealthIndicatorResult>;
  reportUnhealthy(): HealthIndicatorResult;
}
