import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/container";

function Loading() {
  return (
    <Container className="py-6 px-3">
      <section className="pb-6 space-y-2">
        <Skeleton className="h-10 w-[125px]" />
        <Skeleton className="w-[601px]" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div
            key={index}
            className="w-full h-auto overflow-hidden rounded-md flex flex-col space-y-1.5"
          >
            <Skeleton className="w-full rounded-md h-[256px]" />
            <div>
              <Skeleton className="w-[111px]" />
              <Skeleton className="w-[201px]" />
            </div>
          </div>
        ))}
      </section>
    </Container>
  );
}

export default Loading;
