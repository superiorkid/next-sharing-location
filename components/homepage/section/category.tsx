import React from "react";

import Container from "@/components/container";
import CategoryCard from "@/components/homepage/category-card";
import { getCategories } from "@/_actions/category.action";

async function Category() {
  const categories = await getCategories();
  return (
    <section className="h-[76dvh] lg:h-[45dvh]">
      <Container className="flex flex-col space-y-6 justify-center items-center h-full px-3">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl uppercase font-bold tracking-tight">
            kategori
          </h2>
          <p className="tracking-wide">Cari lokasi berdasarkan kategori</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {categories?.map((category, index) => (
            <CategoryCard category={category} key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Category;
