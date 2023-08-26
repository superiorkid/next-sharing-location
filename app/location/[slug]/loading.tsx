import React from "react";
import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <Container>
      <div className="min-h-full flex space-x-7 max-w-5xl mx-auto">
        <main className="flex-1 min-w-0 overflow-auto space-y-4">
          <Skeleton className="h-16 w-[320px] rounded-md" />
          <Skeleton className="w-full h-[65dvh] rounded-md" />
        </main>
        <aside className="w-80 flex-none relative bg-background rounded-md mt-12">
          <Skeleton className="h-[320px] w-full rounded-md" />
        </aside>
      </div>
    </Container>
  );
}

export default Loading;
