import React from "react";
import Header from "@/components/header";
import AddCategoryForm from "@/components/dashboard/add-category-form";

function Page({ searchParams: { mode } }: { searchParams: { mode?: string } }) {
  return (
    <div className="border p-6 rounded-md shadow-sm">
      <Header title="Add category" shortDescription="Add new category" />
      <AddCategoryForm />
    </div>
  );
}

export default Page;
