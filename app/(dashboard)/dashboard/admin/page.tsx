import React from "react";
import StatisticCard from "@/components/dashboard/statistic-card";
import { getUserTotals } from "@/_actions/user.action";
import { getLocationTotals } from "@/_actions/location.action";
import { getCategoryTotals } from "@/_actions/category.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin - Media Berbagi Lokasi",
  description:
    "Dashboard Admin. media informasi berbagi lokasi di lombok timur",
};

async function Page() {
  const userTotal = await getUserTotals();
  const locationTotal = await getLocationTotals();
  const categoryTotal = await getCategoryTotals();
  return (
    <div className="p-6 rounded-md bg-gray-50">
      <div className="flex flex-col lg:flex-row space-y-2.5 lg:space-y-0 lg:space-x-2.5">
        <StatisticCard
          title="Total User"
          description="keseluruhan"
          value={userTotal}
        />
        <StatisticCard
          title="Total Lokasi"
          description="keseluruhan"
          value={locationTotal}
        />
        <StatisticCard
          title="Total Kategori"
          description="keseluruhan"
          value={categoryTotal}
        />
      </div>
      <div></div>
    </div>
  );
}

export default Page;
