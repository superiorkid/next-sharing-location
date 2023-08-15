import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section className="flex min-h-[65dvh] flex-col items-center justify-center space-y-3">
      <Skeleton className="h-12 w-[420px]" />
      <Skeleton className="h-12 w-[201px]" />
      <Skeleton className="max-w-sm md:max-w-xl" />
    </section>
  );
}

export default Loading;
