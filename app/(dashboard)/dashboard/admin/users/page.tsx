import React from "react";
import DataTable from "@/components/dashboard/data-table";
import { userColumns } from "@/components/dashboard/user-columns";
import { getUsers } from "@/_actions/user.action";

async function Page() {
  const users = await getUsers();
  return (
    <div className="border p-6 rounded-md shadow-sm">
      <DataTable data={users} columns={userColumns} />
    </div>
  );
}

export default Page;
