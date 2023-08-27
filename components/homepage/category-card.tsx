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
        src="https://images.unsplash.com/photo-1585854467604-cf2080ccef31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
        alt="category cover"
        className="absolute object-cover brightness-75 rounded-md group-hover:cursor-pointer grayscale"
      />
      <Link
        href={`/explore?category=${category.name}`}
        className="uppercase font-semibold z-10 text-gray-50 tracking-wide"
      >
        {category.name}
      </Link>
    </div>
  );
}

export default CategoryCard;
