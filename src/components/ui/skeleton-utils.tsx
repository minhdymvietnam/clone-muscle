import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
  spacing?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  lines = 3, 
  className,
  lineClassName,
  spacing = "mb-2"
}) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          "h-4 bg-gray-300",
          i === lines - 1 ? "" : spacing,
          i === lines - 1 ? "w-3/4" : "w-full",
          lineClassName
        )} 
      />
    ))}
  </div>
);

interface SkeletonImageProps {
  aspectRatio?: string;
  className?: string;
  rounded?: boolean;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({ 
  aspectRatio = "aspect-video", 
  className,
  rounded = false
}) => (
  <Skeleton 
    className={cn(
      aspectRatio,
      "w-full bg-gray-300",
      rounded && "rounded-full",
      className
    )} 
  />
);

interface SkeletonCardProps {
  className?: string;
  hasImage?: boolean;
  imageAspectRatio?: string;
  textLines?: number;
  children?: React.ReactNode;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className,
  hasImage = true,
  imageAspectRatio = "aspect-video",
  textLines = 3,
  children
}) => (
  <div className={cn("space-y-4", className)}>
    {hasImage && <SkeletonImage aspectRatio={imageAspectRatio} />}
    {children || <SkeletonText lines={textLines} />}
  </div>
);

interface SkeletonSectionProps {
  className?: string;
  height?: string;
  children?: React.ReactNode;
}

export const SkeletonSection: React.FC<SkeletonSectionProps> = ({
  className,
  height = "min-h-[600px]",
  children
}) => (
  <div className={cn("w-full bg-black", height, className)}>
    {children || (
      <div className="flex flex-col items-center justify-center h-full p-8 space-y-6">
        <Skeleton className="h-12 w-64 bg-gray-700" />
        <Skeleton className="h-8 w-96 bg-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )}
  </div>
);