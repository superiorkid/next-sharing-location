import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section>
      <section className="pb-6 space-y-2">
        <Skeleton className="h-10 w-[125px]" />
        <Skeleton className="w-[601px]" />
      </section>
      <Skeleton className="h-[30dvh] w-full rounded-md" />
    </section>
  );
}

export default Loading;
