import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/container";
import LocationCard from "@/components/location-card";
import MaterialSymbolsArrowOutwardRounded from "@/components/icons/MaterialSymbolsArrowOutwardRounded";
import { cn } from "@/lib/utils";

function Recommendation() {
  return (
    <section className="min-h-[96dvh] bg-gray-50 dark:bg-gray-900 p-3 flex items-center">
      <Container className="flex flex-col space-y-4 h-full">
        <div className="flex justify-between items-center">
          <h3 className="uppercase font-bold text-lg">recommendation</h3>
          <Link
            href="/explore"
            className={cn("items-center", buttonVariants({ variant: "link" }))}
          >
            more{" "}
            <MaterialSymbolsArrowOutwardRounded className="inline w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />

          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </div>
      </Container>
    </section>
  );
}

export default Recommendation;
