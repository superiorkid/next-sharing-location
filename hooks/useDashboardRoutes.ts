import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface IRoutes {
  label: string;
  href: string;
  isActive: boolean;
}

export default function useDashboardRoutes() {
  const pathname = usePathname();

  return useMemo<IRoutes[]>(
    () => [
      {
        label: "Akun",
        href: "/dashboard/account",
        isActive: pathname === "/dashboard/account",
      },
      {
        label: "Dashboard",
        href: "/dashboard",
        isActive: pathname === "/dashboard",
      },
    ],
    [pathname]
  );
}
