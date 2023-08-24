import React from "react";
import Header from "@/components/header";
import AddCategoryForm from "@/components/dashboard/add-category-form";
import EditCategoryForm from "@/components/dashboard/edit-category-form";
import { getCategory } from "@/_actions/category.action";

export const revalidate = 0;

async function Page({
  searchParams: { edit },
}: {
  searchParams: { edit: string | null };
}) {
  const category = await getCategory(edit as string);

  return (
    <div className="border p-6 rounded-md shadow-sm">
      <Header title={`Adda category`} shortDescription="Add new category" />
      <AddCategoryForm />
    </div>
  );
}

export default Page;
