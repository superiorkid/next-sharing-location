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
        title: "Pengguna",
      },
      {
        href: "/dashboard/admin/locations",
        title: "Lokasi",
      },

      {
        href: "/dashboard/admin/categories",
        title: "Kategori",
      },
    ],
    []
  );
}
