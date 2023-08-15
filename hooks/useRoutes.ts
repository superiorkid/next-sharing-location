import { useMemo } from "react";

interface IRoutes {
  label: string;
  href: string;
}

export default function useRoutes() {
  return useMemo<IRoutes[]>(
    () => [
      {
        label: "Explore",
        href: "/explore",
      },
      {
        label: "About",
        href: "/about",
      },
    ],
    []
  );
}
