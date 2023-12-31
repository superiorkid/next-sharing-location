import React from "react";

import StatisticCard from "@/components/dashboard/statistic-card";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getPostTotal,
  getTotalWishlist,
  getUserLocations,
} from "@/_actions/user.action";
import DataTable from "@/components/dashboard/data-table";
import { locationColumn } from "@/components/dashboard/location-columns";
import Wishlist from "@/components/dashboard/wishlist";
import getCurrentUser from "@/_actions/get-current-user";
import { Location } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Pengguna - Media Berbagi Lokasi",
  description:
    "Dashboard Pengguna. media informasi berbagi lokasi di lombok timur",
};

async function Page() {
  const currentUser = await getCurrentUser();
  // get location that uploads by current user
  const locations = await getUserLocations();

  // get total location upload by user
  const totalLocation = await getPostTotal();
  const wishlistTotal = await getTotalWishlist();

  return (
    <section className="space-y-4">
      <Header
        title="Dashboard Pengguna"
        shortDescription="Informasi Umum Pengguna"
      />
      <div className="flex flex-col lg:flex-row space-y-2.5 lg:space-y-0 lg:space-x-2.5">
        <StatisticCard
          title="Total Unggahan"
          description="keseluruhan"
          value={totalLocation}
        />
        <StatisticCard
          title="Total Daftar Keinginan"
          description="keseluruhan"
          value={wishlistTotal?._count.likes as number}
        />
      </div>
      <div className="border p-6 shadow-sm rounded-md">
        <Tabs defaultValue="your-upload">
          <TabsList>
            <TabsTrigger value="your-upload">Unggahanmu</TabsTrigger>
            <TabsTrigger value="wishlist">Daftar Keinginan</TabsTrigger>
          </TabsList>

          <div className="py-5">
            <TabsContent value="your-upload">
              <DataTable
                columns={locationColumn}
                data={locations}
                newRowLink="/dashboard/add"
              />
            </TabsContent>
            <TabsContent value="wishlist">
              <Wishlist wishlist={currentUser?.likes as Location[]} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
