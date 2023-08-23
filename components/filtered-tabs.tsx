"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from ".prisma/client";
import { useRouter } from "next/navigation";

interface FilteredTabsProps {
  categories: Category[] | null;
  params: string;
}

function FilteredTabs({ categories, params }: FilteredTabsProps) {
  const router = useRouter();

  return (
    <div className="flex space-x-3 mb-5">
      <Select
        value={params}
        onValueChange={(value) => {
          if (value !== "") {
            router.push(`/explore?category=${value}`);
          } else {
            router.push("/explore");
          }
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All</SelectItem>
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
