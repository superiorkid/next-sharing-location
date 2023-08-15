import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section className="pb-6 flex flex-col space-y-2">
      <Skeleton className="h-10 w-[125px]" />
      <Skeleton className="w-[320px]" />
    </section>
  );
}

export default Loading;
