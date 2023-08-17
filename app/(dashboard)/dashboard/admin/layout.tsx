import React, { useMemo } from "react";

import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tab from "@/components/dashboard/tab";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const tabs = useMemo(
    () => [
      {
        href: "/dashboard/admin",
        title: "Dashboard",
      },
      {
        href: "/dashboard/admin/locations",
        title: "Locations",
      },
      {
        href: "/dashboard/admin/users",
        title: "Users",
      },
      {
        href: "/dashboard/admin/categories",
        title: "Categories",
      },
    ],
    []
  );

  return (
    <section>
      <Header title="Admin Panel" shortDescription="admin panel description" />
      <Tab tabs={tabs} />
      {children}
    </section>
  );
}

export default AdminLayout;
