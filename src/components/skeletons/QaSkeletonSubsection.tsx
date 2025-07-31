import React from 'react';
import { SkeletonText } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const QaSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[800px] lg:min-h-[1000px]">
      <div className="w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-48 lg:w-64 bg-gray-700" />
          </div>

          {/* Q&A Items Skeleton */}
          <div className="w-full space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                {/* Question skeleton */}
                <div className="bg-gray-800/50 p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Skeleton className="w-8 h-8 bg-yellow-400/30 flex-shrink-0" />
                      <div className="flex-1">
                        <SkeletonText 
                          lines={index % 2 === 0 ? 1 : 2} 
                          lineClassName="h-5 bg-gray-700" 
                        />
                      </div>
                    </div>
                    <Skeleton className="w-6 h-6 bg-gray-600 flex-shrink-0" />
                  </div>
                </div>
                
                {/* Answer skeleton (collapsed state) */}
                {index < 2 && (
                  <div className="bg-gray-900/50 p-6 border-t border-gray-700">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-8 h-8 bg-gray-600 flex-shrink-0" />
                      <div className="flex-1">
                        <SkeletonText 
                          lines={3} 
                          lineClassName="h-4 bg-gray-700" 
                          spacing="mb-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Q&A Info Skeleton */}
          <div className="w-full mt-16 text-center">
            <Skeleton className="h-6 w-48 bg-gray-700 mx-auto mb-4" />
            <div className="max-w-2xl mx-auto">
              <SkeletonText 
                lines={2} 
                lineClassName="h-4 bg-gray-700" 
                spacing="mb-2"
              />
            </div>
          </div>

          {/* Contact CTA Skeleton */}
          <div className="mt-12 space-y-4">
            <Skeleton className="h-12 w-56 bg-yellow-400/30 mx-auto" />
            <SkeletonText 
              lines={1} 
              className="text-center max-w-xs mx-auto" 
              lineClassName="h-4 bg-gray-700" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QaSkeletonSubsection;