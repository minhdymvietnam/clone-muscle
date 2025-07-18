import { lazy, Suspense, ComponentType } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: JSX.Element;
  rootMargin?: string;
  threshold?: number;
}

export const LazySection = ({ 
  component, 
  fallback = <div className="h-96 bg-gradient-to-b from-transparent to-gray-900/10" />,
  rootMargin = '100px',
  threshold = 0
}: LazySectionProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    rootMargin,
  });

  const LazyComponent = lazy(component);

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={fallback}>
          <LazyComponent />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};