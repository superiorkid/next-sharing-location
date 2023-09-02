"use client";

import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from ".prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    <div className="flex space-x-3 mb-8 items-center">
      <Select
        value={(searchParams.get("category") as string) ?? ""}
        onValueChange={(value) => {
          if (value.trim().length === 0) {
            const params = new URLSearchParams(searchParams);
            params.delete("category");

            router.push(
              pathname + params.has("sort") && "?" + params.toString()
            );
          } else {
            router.push(pathname + "?" + createQueryString("category", value));
          }

          setCurrentPage((currentPage: number) => 0);
        }}
      >
        <SelectTrigger className="w-[120px] h-8 focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Kategori" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel className="pl-2">
              Saring berdasarkan kategori
            </SelectLabel>
            <SelectSeparator />
            <SelectItem value="">Semua</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                <span className="capitalize">{category.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("sort") ?? "desc"}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
      >
        <SelectTrigger className="w-[187px] h-8 focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Filter berdasarkan tanggal uplaod" />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          <SelectGroup>
            <SelectLabel className="pl-2">Urutkan berdasarkan</SelectLabel>
            <SelectSeparator />
            <SelectItem value="desc">Tanggal: Baru ke lama</SelectItem>
            <SelectItem value="asc">Tanggal: Lama ke baru</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilteredTabs;
