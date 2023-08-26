import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section className="space-y-4">
      <section className="pb-6 space-y-2">
        <Skeleton className="h-10 w-[125px]" />
        <Skeleton className="w-[601px]" />
      </section>
      <div className="flex flex-col lg:flex-row space-y-2.5 lg:space-y-0 lg:space-x-2.5">
        <Skeleton className="h-[202px] w-full rounded-md" />
        <Skeleton className="h-[202px] w-full rounded-md" />
      </div>
      <Skeleton className="h-[540px] w-full rounded-md" />
    </section>
  );
}

export default Loading;
