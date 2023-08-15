import React from "react";

import Container from "@/components/container";
import Header from "@/components/header";
import LocationCard from "@/components/location-card";
import ScrollToTop from "@/components/scroll-to-top";

function Page() {
  return (
    <>
      <Container className="py-6 px-3">
        <Header
          title="Find your favorite location"
          shortDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur doloremque recusandae repellat."
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </section>
        <ScrollToTop />
      </Container>
    </>
  );
}

export default Page;
