"use server";

import { Location } from ".prisma/client";
import categorySchema, {
  TCategory,
} from "@/lib/validations/category.validation";
import { prisma } from "@/lib/prismadb";
import { revalidateTag } from "next/cache";

export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
      {
        method: "GET",
        next: {
          tags: ["category"],
        },
      }
    );

    if (!res) {
      throw new Error("failed to fetch category");
    }

    const { data } = await res.json();
    return data as Location[];
  } catch (error) {
    return null;
  }
};

export const createNewCategory = async (values: TCategory) => {
  const validateData = categorySchema.safeParse(values);

  if (!validateData.success) {
    throw new Error(validateData.error.issues.at(0)?.message);
  }

  const { name, description } = values;

  try {
    // check if category already exists
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (category) {
      throw new Error("Category already exists");
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    revalidateTag("category");
    return "Create new category successfully";
  } catch (error) {
    throw new Error("terjadi kesalahan terhadap server. silahkan coba lagi");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidateTag("category");
    return "Berhasil delete kategori";
  } catch (error) {
    throw new Error("terjadi kesalahan pada server");
  }
};
