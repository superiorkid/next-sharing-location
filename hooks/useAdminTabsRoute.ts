import { useMemo } from "react";

export default function useAdminTabsRoute() {
  return useMemo<{ href: string; title: string }[]>(
    () => [
      {
        href: "/dashboard/admin",
        title: "Dashboard",
      },
      {
        href: "/dashboard/admin/users",
        title: "Users",
      },
      {
        href: "/dashboard/admin/locations",
        title: "Locations",
      },

      {
        href: "/dashboard/admin/categories",
        title: "Categories",
      },
    ],
    []
  );
}
