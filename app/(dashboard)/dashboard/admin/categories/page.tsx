import React from "react";
import { getCategories } from "@/_actions/category.action";
import DataTable from "@/components/dashboard/data-table";
import { categoryColumns } from "@/components/dashboard/category-columns";

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
