import React from "react";

import Container from "@/components/container";
import DashboardNavigation from "@/components/dashboard/dashboard-navigation";
import getCurrentUser from "@/_actions/get-current-user";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  return (
    <Container className="flex min-h-screen">
      <aside className="w-56 border-r drop-shadow-sm hidden lg:block">
        <div className="flex flex-col py-5">
          <DashboardNavigation session={session} />
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-auto p-5">{children}</main>
    </Container>
  );
}

export default DashboardLayout;
