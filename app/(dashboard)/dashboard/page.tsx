import React from "react";

import StatisticCard from "@/components/dashboard/statistic-card";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Page() {
  return (
    <section className="space-y-4">
      <Header title="User Dashboard" shortDescription="Your short statistic" />
      <div className="flex flex-col lg:flex-row space-y-2.5 lg:space-y-0 lg:space-x-2.5">
        <StatisticCard title="Total Post" description="keseluruhan" />
        <StatisticCard title="Total Like" description="keseluruhan" />
        <StatisticCard title="Like Didapat" description="keseluruhan" />
      </div>
      <div className="border p-6 shadow-sm rounded-md">
        <Tabs defaultValue="your-upload" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="your-upload">Your Upload</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <div className="py-5">
            <TabsContent value="your-upload">
              your upload location list
            </TabsContent>
            <TabsContent value="wishlist">your wishlist</TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
