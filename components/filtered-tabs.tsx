"use client";

import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from ".prisma/client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { usePaginationContext } from "@/context/pagination-ctx";

interface FilteredTabsProps {
  categories: Category[] | null;
}

function FilteredTabs({ categories }: FilteredTabsProps) {
  // @ts-ignore
  const { currentPage, setCurrentPage } = usePaginationContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex space-x-3 mb-5">
      <Select
        value={(searchParams.get("category") as string) ?? ""}
        onValueChange={(value) => {
          if (value.trim().length === 0) {
            router.push(pathname);
          } else {
            router.push(pathname + "?" + createQueryString("category", value));
          }

          setCurrentPage((currentPage: number) => 0);
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Semua</SelectItem>
          <SelectSeparator />
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              <span className="capitalize">{category.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilteredTabs;
