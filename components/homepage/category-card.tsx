import React from "react";
import { Category } from ".prisma/client";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="border-2 w-full p-3 h-[13dvh] flex items-center justify-center shadow-sm rounded-md first:col-span-2 lg:first:col-auto group relative">
      <Image
        fill
        priority
        src="/images/category-cover.jpg"
        alt="category cover"
        className="absolute object-cover brightness-75 rounded-md group-hover:cursor-pointer"
      />
      <Link
        href={`/explore?category=${category.name}`}
        className="uppercase font-semibold  z-10 text-gray-100"
      >
        {category.name}
      </Link>
    </div>
  );
}

export default CategoryCard;
