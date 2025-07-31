import React from 'react';
import { SkeletonText, SkeletonImage } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const IssueSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[800px] lg:min-h-[1200px]">
      <div className="w-full h-full flex flex-col justify-center px-4 lg:px-0 relative overflow-hidden">
        {/* Top heading section skeleton */}
        <div className="pt-11 lg:pt-24 flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center mx-auto w-full max-w-screen-xl">
            {/* Title skeleton */}
            <div className="flex items-baseline justify-center gap-1.5 lg:gap-4 mb-9">
              <Skeleton className="h-4 lg:h-10 w-8 lg:w-20 bg-gray-700" />
              <Skeleton className="h-8 lg:h-16 w-80 lg:w-96 bg-gray-700" />
              <Skeleton className="h-4 lg:h-10 w-8 lg:w-20 bg-gray-700" />
            </div>

            {/* Central image and side elements skeleton */}
            <div className="mx-auto w-full max-w-screen-xl">
              <div className="relative w-full">
                {/* Central image skeleton */}
                <div className="relative mx-auto max-w-[628px] w-full">
                  <SkeletonImage aspectRatio="aspect-square" className="bg-gray-700" />
                </div>
                
                {/* Side elements skeleton */}
                <div className="max-lg:max-w-[312px] max-lg:-mt-40 max-lg:flex max-lg:flex-col-reverse max-lg:items-center max-lg:gap-10 max-lg:mx-auto lg:absolute w-full lg:h-full lg:top-0 lg:bottom-0 lg:left-0 lg:right-0">
                  <div className="lg:absolute lg:top-[30px] left-0">
                    <div className="w-[250px] aspect-square relative mb-[5px]">
                      <SkeletonImage aspectRatio="aspect-square" rounded className="bg-gray-700" />
                      <Skeleton className="absolute bottom-0 left-0 h-8 w-48 bg-yellow-400/30" />
                    </div>
                    <Skeleton className="h-6 w-40 bg-gray-700" />
                  </div>
                  
                  <div className="lg:absolute lg:bottom-[30px] left-[180px]">
                    <div className="w-[250px] aspect-square relative mb-[5px]">
                      <SkeletonImage aspectRatio="aspect-square" rounded className="bg-gray-700" />
                      <Skeleton className="absolute bottom-0 left-0 h-6 w-32 bg-gray-700" />
                    </div>
                    <Skeleton className="h-8 w-36 bg-yellow-400/30" />
                  </div>
                  
                  <div className="lg:absolute lg:top-1/2 lg:transform lg:translate-y-[-50%] right-0">
                    <div className="w-[250px] aspect-square relative mb-[5px]">
                      <SkeletonImage aspectRatio="aspect-square" rounded className="bg-gray-700" />
                      <Skeleton className="absolute bottom-0 left-0 h-6 w-44 bg-gray-700" />
                    </div>
                    <Skeleton className="h-8 w-32 bg-yellow-400/30" />
                  </div>
                </div>
              </div>
              
              {/* Arrow skeleton */}
              <div className="flex justify-center mt-8">
                <Skeleton className="w-[847px] h-[72px] md:h-[136px] bg-gray-700" />
              </div>
            </div>
          </div>

          {/* Message section skeleton */}
          <div className="relative w-full pt-[70px] md:pt-[120px]">
            <div className="flex flex-col items-center gap-8 mb-16">
              <Skeleton className="h-8 w-32 bg-yellow-400/30" />
              <Skeleton className="h-16 lg:h-32 w-64 lg:w-96 bg-gray-700" />
            </div>
            
            {/* Message text skeleton */}
            <div className="max-w-[680px] mx-auto">
              <SkeletonText lines={6} className="space-y-4" lineClassName="h-6 bg-gray-700" />
            </div>
            
            {/* Bottom images skeleton */}
            <div className="relative pt-10 lg:pt-60 w-full">
              <div className="flex items-center gap-5 justify-between">
                <SkeletonImage aspectRatio="aspect-[3/4]" className="w-1/2 bg-gray-700" />
                <SkeletonImage aspectRatio="aspect-[3/4]" className="w-1/2 bg-gray-700" />
              </div>
            </div>
          </div>

          {/* Horizontal scrolling text skeleton */}
          <div className="absolute bottom-0 left-0 h-[60px] md:h-[180px] w-full">
            <Skeleton className="h-full w-full bg-gray-800/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueSkeletonSubsection;