import React from 'react';
import { SkeletonText } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const MovieSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[800px] lg:min-h-[1000px]">
      <div className="w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-64 lg:w-80 bg-gray-700" />
          </div>

          {/* Video Player Skeleton */}
          <div className="relative w-full max-w-4xl aspect-video mb-8">
            <Skeleton className="w-full h-full bg-gray-700 rounded-lg" />
            
            {/* Play button skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-20 h-20 rounded-full bg-gray-600" />
            </div>
            
            {/* Video controls skeleton */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 bg-gray-600" />
                  <Skeleton className="w-12 h-4 bg-gray-600" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 bg-gray-600" />
                  <Skeleton className="w-8 h-8 bg-gray-600" />
                </div>
              </div>
              <Skeleton className="w-full h-2 bg-gray-600 mt-2" />
            </div>
          </div>

          {/* Video Description Skeleton */}
          <div className="w-full max-w-3xl text-center">
            <SkeletonText 
              lines={3} 
              className="mb-8" 
              lineClassName="h-5 lg:h-6 bg-gray-700" 
            />
          </div>

          {/* Additional Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4 bg-gray-700" />
              <SkeletonText lines={2} lineClassName="h-4 bg-gray-700" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4 bg-gray-700" />
              <SkeletonText lines={2} lineClassName="h-4 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSkeletonSubsection;