import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <div className="min-h-[200px] bg-black animate-pulse" />,
  rootMargin = '100px',
  threshold = 0.1
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  });

  return (
    <div ref={ref}>
      <Suspense fallback={fallback}>
        {inView ? children : fallback}
      </Suspense>
    </div>
  );
};

export default LazySection;