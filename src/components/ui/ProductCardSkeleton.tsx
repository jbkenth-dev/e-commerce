import React from 'react';
import { Skeleton } from './Skeleton';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-100 h-full">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] w-full">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col space-y-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-2/3 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
        
        {/* Category, Rating, Cart Button */}
        <div className="flex items-center mt-auto justify-between pt-2">
          <div className="flex items-center space-x-2 flex-1">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" /> {/* Bullet */}
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full ml-2" />
        </div>
      </div>
    </div>
  );
};
