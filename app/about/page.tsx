import React from "react";

import Header from "@/components/header";
import Container from "@/components/container";

function Page() {
  return (
    <>
      <Container className="py-6 px-3">
        <Header
          title="About this project"
          shortDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        />
        <section>about content here...</section>
      </Container>
    </>
  );
}

export default Page;
