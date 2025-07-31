import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
}

interface WebVitalMetric {
  name: string;
  value: number;
  delta?: number;
  id?: string;
}

export const usePerformanceMonitor = (): PerformanceMetrics => {
  const metrics: PerformanceMetrics = {};

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
            console.log(`FCP: ${entry.startTime.toFixed(2)}ms`);
          }
        }

        if (entry.entryType === 'largest-contentful-paint') {
          const lcpEntry = entry as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };
          const lcpValue = lcpEntry.renderTime || lcpEntry.loadTime || entry.startTime;
          metrics.lcp = lcpValue;
          console.log(`LCP: ${lcpValue.toFixed(2)}ms`);
        }

        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEntry & {
            processingStart: number;
          };
          const fidValue = fidEntry.processingStart - entry.startTime;
          metrics.fid = fidValue;
          console.log(`FID: ${fidValue.toFixed(2)}ms`);
        }

        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };
          if (!clsEntry.hadRecentInput) {
            metrics.cls = (metrics.cls || 0) + clsEntry.value;
            console.log(`CLS: ${clsEntry.value.toFixed(4)}`);
          }
        }
      });
    });

    const supportedEntryTypes = ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'];

    try {
      // Check which entry types are supported
      const availableTypes = supportedEntryTypes.filter(type => {
        try {
          observer.observe({ entryTypes: [type] });
          return true;
        } catch {
          return false;
        }
      });

      if (availableTypes.length > 0) {
        observer.observe({ entryTypes: availableTypes });
      }
    } catch (e) {
      console.warn('Performance Observer not supported:', e);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return metrics;
};

export const reportWebVitals = (metric: WebVitalMetric): void => {
  const unit = metric.name === 'CLS' ? '' : 'ms';
  console.log(`${metric.name}: ${metric.value.toFixed(2)}${unit}`);
};