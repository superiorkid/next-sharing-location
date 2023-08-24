import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/container";
import MaterialSymbolsArrowOutwardRounded from "@/components/icons/MaterialSymbolsArrowOutwardRounded";
import { cn } from "@/lib/utils";
import { getRecommendation } from "@/_actions/location.action";
import LocationCard from "@/components/location-card";

async function Recommendation() {
  const locations = await getRecommendation();

  return (
    <section className="min-h-[96dvh] bg-gray-50 dark:bg-gray-900 p-3 flex items-center">
      <Container className="flex flex-col space-y-4 h-full">
        <div className="flex justify-between items-center">
          <h3 className="uppercase font-bold text-lg">Rekomendasi</h3>
          <Link
            href="/explore"
            className={cn("items-center", buttonVariants({ variant: "link" }))}
          >
            lebih banyak{" "}
            <MaterialSymbolsArrowOutwardRounded className="inline w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              slug={location.slug}
              address={location.address}
              images={location.photos}
              name={location.name}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Recommendation;
