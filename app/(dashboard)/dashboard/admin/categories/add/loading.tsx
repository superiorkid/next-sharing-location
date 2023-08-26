import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section className="space-y-4">
      <section className="pb-6 space-y-2">
        <Skeleton className="h-10 w-[125px]" />
        <Skeleton className="w-[601px]" />
      </section>
      <Skeleton className="h-[45dvh] w-full" />
    </section>
  );
}

export default Loading;
