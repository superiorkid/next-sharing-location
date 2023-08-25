import React from "react";
import Header from "@/components/header";
import EditCategoryForm from "@/components/dashboard/edit-category-form";
import { getCategory } from "@/_actions/category.action";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const category = await getCategory(params.id);
  return {
    title: `Edit ${category.name} - Media Berbagi Lokasi`,
    description: `Edit Kategori dari ${category.name}`,
  };
}

async function Page({ params: { id } }: { params: { id: string } }) {
  const category = await getCategory(id);

  if (!category) {
    notFound();
  } else {
    return (
      <div className="border p-6 rounded-md shadow-sm">
        <Header title="Edit category" shortDescription="Edit category" />
        <EditCategoryForm category={category} />
      </div>
    );
  }
}

export default Page;
