import React, {Suspense} from 'react';
import {useInView} from 'react-intersection-observer';

interface LazySectionProps {
  children: React.ReactNode;
  id?: string;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  skeletonComponent?: React.ComponentType;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  id,
  fallback,
  rootMargin = '300px',
  threshold = 0.1,
  skeletonComponent: SkeletonComponent
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  });

  // Determine the fallback to use
  const getSkeletonFallback = () => {
    if (SkeletonComponent) {
      return <SkeletonComponent/>;
    }
    if (fallback) {
      return fallback;
    }
    return <div className="min-h-[200px] bg-black animate-pulse"/>;
  };

  const skeletonFallback = getSkeletonFallback();

  return (
      <div ref={ref} id={id}>
        <Suspense fallback={skeletonFallback}>
          {inView ? children : skeletonFallback}
      </Suspense>
    </div>
  );
};

export default LazySection;