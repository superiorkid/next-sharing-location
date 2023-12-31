import React from "react";
import DataTable from "@/components/dashboard/data-table";
import { getLocations } from "@/_actions/location.action";
import { locationColumnsAdmin } from "@/components/dashboard/location-columns-admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Lokasi - Media Berbagi Lokasi",
  description:
    "Manajemen Lokasi. media informasi berbagi lokasi di lombok timur",
};

async function Page() {
  const locations = await getLocations();

  return (
    <div className="border p-6 rounded-md shadow-sm">
      <DataTable columns={locationColumnsAdmin} data={locations} />
    </div>
  );
}

export default Page;
