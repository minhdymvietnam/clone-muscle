import React from 'react';
import { SkeletonText } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const RecruitSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[1000px] lg:min-h-[1200px]">
      <div className="w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
          {/* Header Section Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-72 lg:w-96 bg-gray-700" />
          </div>

          {/* Recruitment Info Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-16">
            {/* Left column - Job details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-48 bg-yellow-400/30" />
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex">
                      <Skeleton className="h-5 w-24 bg-gray-600 mr-4" />
                      <Skeleton className="h-5 flex-1 bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-32 bg-yellow-400/30" />
                <SkeletonText 
                  lines={4} 
                  lineClassName="h-4 bg-gray-700" 
                  spacing="mb-2"
                />
              </div>
            </div>

            {/* Right column - Requirements & Benefits */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-40 bg-yellow-400/30" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="w-4 h-4 bg-gray-600 mr-3" />
                      <Skeleton className="h-4 flex-1 bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-36 bg-yellow-400/30" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="w-4 h-4 bg-gray-600 mr-3" />
                      <Skeleton className="h-4 flex-1 bg-gray-700" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Application Process Skeleton */}
          <div className="w-full mb-16">
            <Skeleton className="h-8 w-48 bg-yellow-400/30 mb-8 mx-auto" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto">
                    <Skeleton className="w-full h-full bg-yellow-400/30 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-24 bg-gray-700 mx-auto" />
                  <SkeletonText 
                    lines={2} 
                    className="max-w-xs mx-auto" 
                    lineClassName="h-4 bg-gray-700" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Skeleton */}
          <div className="w-full text-center space-y-6">
            <Skeleton className="h-8 w-40 bg-yellow-400/30 mx-auto" />
            <div className="max-w-md mx-auto space-y-3">
              <Skeleton className="h-5 w-full bg-gray-700" />
              <Skeleton className="h-5 w-3/4 bg-gray-700 mx-auto" />
              <Skeleton className="h-5 w-2/3 bg-gray-700 mx-auto" />
            </div>
          </div>

          {/* Application CTA Skeleton */}
          <div className="mt-12">
            <Skeleton className="h-14 w-64 bg-yellow-400/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitSkeletonSubsection;