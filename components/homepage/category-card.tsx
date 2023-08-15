import React from "react";
import { Category } from ".prisma/client";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="border-2 w-full p-3 h-[13dvh] flex items-center justify-center shadow-sm rounded-md first:col-span-2 lg:first:col-auto">
      <Link
        href={`#category-${category.name}`}
        className="uppercase font-semibold"
      >
        {category.name}
      </Link>
    </div>
  );
}

export default CategoryCard;
