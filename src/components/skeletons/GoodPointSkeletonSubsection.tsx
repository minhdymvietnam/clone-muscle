import React from 'react';
import { SkeletonText, SkeletonImage } from '@/components/ui/skeleton-utils';
import { Skeleton } from '@/components/ui/skeleton';

const GoodPointSkeletonSubsection: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-[1600px] lg:min-h-[2000px]">
      <div className="flex flex-col items-center w-full py-[70px] lg:py-[120px] px-4 lg:px-0">
        <div className="relative z-10 flex flex-col w-full items-center md:gap-[50px]">
          {/* Section Header Skeleton */}
          <div className="flex flex-col items-center gap-5 w-full mb-16">
            <Skeleton className="h-8 w-32 bg-yellow-400/30" />
            <Skeleton className="h-16 lg:h-32 w-80 lg:w-96 bg-gray-700" />
          </div>

          {/* Good Points Content Skeleton - 4 points */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full max-w-[1560px] mb-[41px]">
              <div className={`flex flex-col w-full justify-between md:items-center gap-7 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}>
                {/* Point Content Skeleton */}
                <div className="flex flex-col w-full md:w-2/5 max-w-[597px] items-start gap-6 xl:px-[30px] xl:gap-10">
                  {/* Point Number Skeleton */}
                  <Skeleton className="w-3/5 max-w-[364px] h-20 lg:h-32 bg-gray-700" />
                  
                  {/* Point Title Skeleton */}
                  <Skeleton className="h-10 lg:h-16 w-4/5 bg-yellow-400/30" />
                  
                  {/* Point Description Skeleton */}
                  <SkeletonText 
                    lines={4} 
                    className="max-w-[550px]" 
                    lineClassName="h-5 lg:h-6 bg-gray-700" 
                  />
                </div>

                {/* Image Section Skeleton */}
                <div className="relative w-full max-w-[935px]">
                  <SkeletonImage 
                    aspectRatio="aspect-[933.92/574.7]" 
                    className="bg-gray-700" 
                  />
                  
                  {/* Decorative elements skeleton */}
                  <div className="absolute top-0 left-0 bottom-0 right-0">
                    <Skeleton className="absolute w-[13.33%] h-8 right-0 bottom-0 bg-gray-600" />
                    <Skeleton className="absolute w-[17%] h-6 top-0 left-[12.06%] bg-gray-600" />
                    <Skeleton className="absolute w-[26%] h-10 bottom-0 left-0 bg-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Benefits Cards Skeleton */}
          <div className="flex justify-center md:max-xl:grid md:max-xl:grid-cols-2 md:max-xl:px-10 flex-wrap gap-2 lg:gap-4 w-full max-w-[1250px] mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[calc(50%+0.5rem)] max-md:h-[63px] max-w-[307px] md:max-xl:w-full md:max-xl:max-w-full bg-yellow-400/30 -mr-6 transform -translate-x-3"
              >
                <div className="flex items-center justify-center h-full p-4">
                  <SkeletonText 
                    lines={2} 
                    className="text-center" 
                    lineClassName="h-4 lg:h-5 bg-gray-800/50" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodPointSkeletonSubsection;