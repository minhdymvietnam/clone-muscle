import React from 'react';
import { SkeletonText } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const EntrySkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[900px] lg:min-h-[1100px]">
      <div className="w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-56 lg:w-72 bg-gray-700" />
          </div>

          {/* Entry Form Skeleton */}
          <div className="w-full max-w-2xl bg-gray-800/30 rounded-lg p-8 space-y-6">
            {/* Form fields skeleton */}
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-24 bg-gray-700 mb-2" />
                <Skeleton className="h-12 w-full bg-gray-700" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-32 bg-gray-700 mb-2" />
                <Skeleton className="h-12 w-full bg-gray-700" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-28 bg-gray-700 mb-2" />
                <Skeleton className="h-12 w-full bg-gray-700" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-36 bg-gray-700 mb-2" />
                <Skeleton className="h-12 w-full bg-gray-700" />
              </div>

              <div>
                <Skeleton className="h-5 w-40 bg-gray-700 mb-2" />
                <Skeleton className="h-32 w-full bg-gray-700" />
              </div>
            </div>

            {/* Checkboxes/Agreement skeleton */}
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 bg-gray-700 flex-shrink-0 mt-0.5" />
                  <SkeletonText 
                    lines={index === 0 ? 2 : 1} 
                    lineClassName="h-4 bg-gray-700" 
                  />
                </div>
              ))}
            </div>

            {/* Submit button skeleton */}
            <div className="pt-6">
              <Skeleton className="h-14 w-full bg-yellow-400/30" />
            </div>
          </div>

          {/* Additional Info Skeleton */}
          <div className="w-full mt-16 text-center space-y-6">
            <Skeleton className="h-6 w-48 bg-gray-700 mx-auto" />
            <div className="max-w-xl mx-auto">
              <SkeletonText 
                lines={3} 
                lineClassName="h-4 bg-gray-700" 
                spacing="mb-2"
              />
            </div>
          </div>

          {/* Contact alternatives skeleton */}
          <div className="mt-12 space-y-4">
            <Skeleton className="h-6 w-40 bg-gray-700 mx-auto" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Skeleton className="h-10 w-48 bg-gray-700" />
              <Skeleton className="h-10 w-48 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrySkeletonSubsection;