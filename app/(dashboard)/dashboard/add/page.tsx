import React from "react";

import Header from "@/components/header";
import AddLocationForm from "@/components/dashboard/add-location-form";
import { getCategories } from "@/_actions/category.action";

async function Page() {
  const categories = await getCategories();
  return (
    <section className="space-y-4">
      <Header
        title="Add New Location"
        shortDescription="Add New Location To share with people"
      />
      <div className="border p-6 rounded-md shadow-sm">
        <AddLocationForm categories={categories} />
      </div>
    </section>
  );
}

export default Page;
