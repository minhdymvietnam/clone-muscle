import React from 'react';
import { SkeletonText } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const ScheduleSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[900px] lg:min-h-[1200px]">
      <div className="w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-72 lg:w-96 bg-gray-700" />
          </div>

          {/* Schedule Table/Grid Skeleton */}
          <div className="w-full max-w-4xl">
            {/* Table header skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-12 bg-yellow-400/30" />
              ))}
            </div>

            {/* Schedule rows skeleton */}
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <div key={colIndex} className="space-y-2">
                    <Skeleton className="h-8 bg-gray-700" />
                    {colIndex === 0 && (
                      <SkeletonText lines={2} lineClassName="h-3 bg-gray-600" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Schedule Notes Skeleton */}
          <div className="w-full max-w-3xl mt-12">
            <Skeleton className="h-6 w-32 bg-yellow-400/30 mb-4" />
            <SkeletonText 
              lines={4} 
              lineClassName="h-4 bg-gray-700" 
              spacing="mb-2"
            />
          </div>

          {/* Call to Action Skeleton */}
          <div className="mt-12 space-y-4">
            <Skeleton className="h-12 w-48 bg-yellow-400/30 mx-auto" />
            <SkeletonText 
              lines={1} 
              className="text-center max-w-md mx-auto" 
              lineClassName="h-4 bg-gray-700" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSkeletonSubsection;