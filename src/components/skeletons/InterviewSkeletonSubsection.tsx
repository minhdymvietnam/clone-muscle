import React from 'react';
import { SkeletonText, SkeletonImage } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const InterviewSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[1000px] lg:min-h-[1400px]">
      <div className="w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-80 lg:w-96 bg-gray-700" />
          </div>

          {/* Interview Cards Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden">
                {/* Interview image skeleton */}
                <SkeletonImage 
                  aspectRatio="aspect-video" 
                  className="bg-gray-700" 
                />
                
                {/* Interview content skeleton */}
                <div className="p-6 space-y-4">
                  {/* Name/Title skeleton */}
                  <div className="flex items-center gap-4">
                    <SkeletonImage 
                      aspectRatio="aspect-square" 
                      className="w-12 h-12 bg-gray-700" 
                      rounded 
                    />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32 bg-gray-700" />
                      <Skeleton className="h-4 w-24 bg-gray-600" />
                    </div>
                  </div>
                  
                  {/* Interview text skeleton */}
                  <SkeletonText 
                    lines={4} 
                    lineClassName="h-4 bg-gray-700" 
                    spacing="mb-2"
                  />
                  
                  {/* Tags/Categories skeleton */}
                  <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton 
                        key={tagIndex} 
                        className="h-6 w-16 bg-yellow-400/30" 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Interview Info Skeleton */}
          <div className="w-full mt-16 text-center">
            <Skeleton className="h-8 w-64 bg-gray-700 mx-auto mb-6" />
            <div className="max-w-3xl mx-auto">
              <SkeletonText 
                lines={3} 
                lineClassName="h-5 bg-gray-700" 
                spacing="mb-3"
              />
            </div>
          </div>

          {/* Interview CTA Skeleton */}
          <div className="mt-12">
            <Skeleton className="h-12 w-48 bg-yellow-400/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSkeletonSubsection;