"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useAdminTabsRoute from "@/hooks/useAdminTabsRoute";

function Tab() {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = useAdminTabsRoute();

  return (
    <Tabs
      className="w-[400px] mb-3"
      onValueChange={(value) => router.push(value)}
    >
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger
            value={tab.href}
            key={index}
            className={cn(
              pathname === tab.href &&
                "bg-background text-foreground shadow-sm",
              "capitalize"
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default Tab;
