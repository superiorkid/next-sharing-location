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

async function Page() {
  // get location that uploads by current user
  const locations = await getUserLocations();

  // get total location upload by user
  const totalLocation = await getPostTotal();
  const wishlistTotal = await getTotalWishlist();

  return (
    <section className="space-y-4">
      <Header title="User Dashboard" shortDescription="Your short statistic" />
      <div className="flex flex-col lg:flex-row space-y-2.5 lg:space-y-0 lg:space-x-2.5">
        <StatisticCard
          title="Total Post"
          description="keseluruhan"
          value={totalLocation}
        />
        <StatisticCard
          title="Total Wishlist"
          description="keseluruhan"
          value={wishlistTotal?._count.likes as number}
        />
      </div>
      <div className="border p-6 shadow-sm rounded-md">
        <Tabs defaultValue="your-upload">
          <TabsList>
            <TabsTrigger value="your-upload">Your Upload</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
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
              <Wishlist />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
