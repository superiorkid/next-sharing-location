"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Location } from "@prisma/client";
import { useInView } from "react-intersection-observer";
import { getInfiniteLocations } from "@/_actions/location.action";
import LocationCard from "@/components/location-card";
import { useSearchParams } from "next/navigation";
import { usePaginationContext } from "@/context/pagination-ctx";

interface LoadMoreProps {
  category?: string;
}

function LoadMore({ category }: LoadMoreProps) {
  // @ts-ignore
  const { currentPage, setCurrentPage } = usePaginationContext();

  const [locations, setLocations] = useState<Location[]>([]);
  const searchParams = useSearchParams();

  const { ref, inView } = useInView({ threshold: 1 });

  const loadMoreLocations = useCallback(async () => {
    const nextPage = currentPage + 1;
    const newLocations =
      (await getInfiniteLocations(nextPage, category ?? undefined)) ?? [];
    if (searchParams.get("category")) {
      setLocations((prevLocations) => newLocations);
    } else {
      setLocations((prevLocations) => [...prevLocations, ...newLocations]);
    }

    if (
      JSON.stringify(locations) != JSON.stringify(newLocations) &&
      newLocations.length > 0
    ) {
      setCurrentPage((currentPage: number) => currentPage + 1);
    }
  }, [category, currentPage, locations, searchParams, setCurrentPage]);

  useEffect(() => {
    if (inView) {
      console.log("load more locations...");
      loadMoreLocations();
    }
  }, [inView]);

  return (
    <>
      {locations.map((location, key) => (
        <LocationCard
          key={location.id}
          name={location.name}
          address={location.address}
          images={location.photos}
          slug={location.slug}
        />
      ))}
      <div className="h-[120px] flex justify-center items-end">
        <div className="h-5 z-10 flex w-full" ref={ref} />
      </div>
    </>
  );
}

export default LoadMore;
