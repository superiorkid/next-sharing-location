import React from "react";

import Container from "@/components/container";
import Header from "@/components/header";
import LocationCard from "@/components/location-card";
import ScrollToTop from "@/components/scroll-to-top";
import { getLocations } from "@/_actions/location.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore - Media Berbagi Lokasi",
  description: "Daftar Semua Tempat/Lokasi menarik.",
};

async function Page() {
  const locations = await getLocations();

  return (
    <>
      <Container className="py-6 px-3">
        <Header
          title="Find your favorite location"
          shortDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur doloremque recusandae repellat."
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          s
          {locations?.length ? (
            locations.map((location) => (
              <LocationCard
                key={location.id}
                slug={location.slug}
                address={location.address}
                images={location.photos}
                name={location.name}
              />
            ))
          ) : (
            <div className="col-span-5">
              <span className="text-rose-500">
                Tidak ada lokasi yang tersedia.
              </span>
            </div>
          )}
        </section>
        <ScrollToTop />
      </Container>
    </>
  );
}

export default Page;
