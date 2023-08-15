"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import useDashboardRoutes from "@/hooks/useDashboardRoutes";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

interface DashboardNavigationProps {
  session: User | null;
}

function DashboardNavigation({ session }: DashboardNavigationProps) {
  const routes = useDashboardRoutes();
  const pathname = usePathname();

  return (
    <>
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            "py-2.5 px-6 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-2",
            route.isActive && "bg-gray-100 dark:bg-gray-800"
          )}
        >
          {route.label}
        </Link>
      ))}

      {session?.role === "ADMIN" && (
        <Link
          href="/dashboard/admin"
          className={cn(
            "py-2.5 px-6 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-2",
            pathname === "/dashboard/admin" && "bg-gray-100 dark:bg-gray-800"
          )}
        >
          Admin
        </Link>
      )}
    </>
  );
}

export default DashboardNavigation;
