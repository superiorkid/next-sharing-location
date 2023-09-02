import React from "react";

import Container from "@/components/container";
import Header from "@/components/header";
import LocationCard from "@/components/location-card";
import ScrollToTop from "@/components/scroll-to-top";
import { getInfiniteLocations } from "@/_actions/location.action";
import { getCategories } from "@/_actions/category.action";
import FilteredTabs from "@/components/filtered-tabs";
import { Category } from ".prisma/client";
import { Metadata } from "next";
import LoadMore from "@/components/load-more";

export const metadata: Metadata = {
  title: "Explore - Media Berbagi Lokasi",
  description: "Daftar Semua Tempat/Lokasi menarik.",
};

interface ExplorePageProps {
  searchParams: { category?: string; sort?: "desc" | "asc" };
}

async function Page({ searchParams: { category, sort } }: ExplorePageProps) {
  const categories = await getCategories();
  // const checkCategory = categories?.some((val) => val.name === category);
  // const locations =
  //   !category && !checkCategory
  //     ? await getLocations()
  //     : await getLocationByCategory(category as string);

  const locations = await getInfiniteLocations(0, category, sort);

  return (
    <>
      <Container className="py-6 px-3">
        <Header
          title={"Temukan Lokasi Favoritmu"}
          shortDescription="Discover the Extraordinary: Unveiling Unique Destinations Together"
        />

        <FilteredTabs
          // params={category as string}
          categories={categories as unknown as Category[]}
        />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations?.map((location) => (
            <LocationCard
              key={location.id}
              slug={location.slug}
              address={location.address}
              images={location.photos}
              name={location.name}
            />
          ))}
          <LoadMore category={category} sort={sort} />
        </section>

        {/*<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">*/}
        {/*  {locations?.length ? (*/}
        {/*    locations?.map((location) => (*/}
        {/*      <LocationCard*/}
        {/*        key={location.id}*/}
        {/*        slug={location.slug}*/}
        {/*        address={location.address}*/}
        {/*        images={location.photos}*/}
        {/*        name={location.name}*/}
        {/*      />*/}
        {/*    ))*/}
        {/*  ) : (*/}
        {/*    <div className="col-span-5">*/}
        {/*      <span className="text-rose-500">*/}
        {/*        Tidak ada lokasi yang tersedia.*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</section>*/}
        <ScrollToTop />
      </Container>
    </>
  );
}

export default Page;
