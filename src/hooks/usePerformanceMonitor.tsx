import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            console.log(`FCP: ${entry.startTime}ms`);
          }
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP: ${entry.startTime}ms`);
        }
        
        if (entry.entryType === 'first-input') {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
        
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            console.log(`CLS: ${entry.value}`);
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    return () => {
      observer.disconnect();
    };
  }, []);
};

export const reportWebVitals = (metric: any) => {
  console.log(`${metric.name}: ${metric.value}ms`);
};