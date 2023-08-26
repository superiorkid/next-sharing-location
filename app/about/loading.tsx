import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="max-w-4xl py-6 px-3 mx-auto">
      <Skeleton className="w-[176px] h-12" />
      <div className="space-y-2">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-1/2" />
      </div>
    </div>
  );
}

export default Loading;
