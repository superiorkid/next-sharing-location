import React from "react";

import Header from "@/components/header";

function Page() {
  return (
    <section>
      <Header
        title="Account Information"
        shortDescription="your account information"
      />
      <div className="border p-6">account information</div>
    </section>
  );
}

export default Page;
