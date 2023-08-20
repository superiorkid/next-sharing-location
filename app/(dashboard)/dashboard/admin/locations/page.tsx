import React from "react";
import DataTable from "@/components/dashboard/data-table";
import { getLocations } from "@/_actions/location.action";
import { locationColumn } from "@/components/dashboard/location-columns";

async function Page() {
  const locations = await getLocations();

  return (
    <div className="border p-6 rounded-md shadow-sm">
      <DataTable columns={locationColumn} data={locations} />
    </div>
  );
}

export default Page;
