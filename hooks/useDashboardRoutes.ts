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
        label: "Dashboard",
        href: "/dashboard",
        isActive: pathname === "/dashboard",
      },
      {
        label: "Account",
        href: "/dashboard/account",
        isActive: pathname === "/dashboard/account",
      },
    ],
    [pathname]
  );
}
