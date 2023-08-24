import { useMemo } from "react";

interface IRoutes {
  label: string;
  href: string;
}

export default function useRoutes() {
  return useMemo<IRoutes[]>(
    () => [
      {
        label: "Jelajah",
        href: "/explore",
      },
      {
        label: "Tentang",
        href: "/about",
      },
    ],
    []
  );
}
