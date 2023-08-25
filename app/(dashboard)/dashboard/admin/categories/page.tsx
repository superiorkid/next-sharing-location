import React from "react";
import { getCategories } from "@/_actions/category.action";
import DataTable from "@/components/dashboard/data-table";
import { categoryColumns } from "@/components/dashboard/category-columns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Kategori - Media Berbagi Lokasi",
  description:
    "Manajemen Kategori. media informasi berbagi lokasi di lombok timur",
};

async function Page() {
  const categories = await getCategories();
  return (
    <div className="border p-6 rounded-md shadow-sm space-y-6">
      <DataTable
        columns={categoryColumns}
        data={categories}
        newRowLink="/dashboard/admin/categories/add"
      />
    </div>
  );
}

export default Page;
