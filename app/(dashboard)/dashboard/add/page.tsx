import React from "react";

import Header from "@/components/header";
import AddLocationForm from "@/components/dashboard/add-location-form";
import { getCategories } from "@/_actions/category.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Lokasi - Media Berbagi Lokasi",
  description: "Tambah Lokasi. media informasi berbagi lokasi di lombok timur",
};

async function Page({ searchParams }: { searchParams: { edit?: string } }) {
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
