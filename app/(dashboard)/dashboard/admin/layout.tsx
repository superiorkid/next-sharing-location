import React from "react";

import Header from "@/components/header";
import Tab from "@/components/dashboard/tab";
import getCurrentUser from "@/_actions/get-current-user";
import { redirect } from "next/navigation";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <section>
      <Header title="Admin Panel" shortDescription="admin panel description" />
      <Tab />
      {children}
    </section>
  );
}

export default AdminLayout;
