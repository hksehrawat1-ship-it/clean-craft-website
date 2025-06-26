
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogLoadingStateProps {
  pageSize: number;
}

const BlogLoadingState = ({ pageSize }: BlogLoadingStateProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: Math.min(6, pageSize) }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <Skeleton className="aspect-[16/10] w-full" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogLoadingState;
