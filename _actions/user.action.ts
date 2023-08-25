"use server";

import { prisma } from "@/lib/prismadb";
import getCurrentUser from "@/_actions/get-current-user";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function getUsers() {
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "GET",
      next: {
        tags: ["user"],
      },
    });

    const { data } = await res.json();
    return data as User[];
  } catch (e) {
    throw new Error("terjadi kesalahan pada server");
  }
}

export async function getUserTotals() {
  const totals = await prisma.user.count();
  return totals;
}

export async function getPostTotal() {
  const currentUser = await getCurrentUser();
  try {
    return await prisma.location.count({
      where: {
        authorId: currentUser?.id,
      },
    });
  } catch (e) {
    throw new Error("something went wrong");
  }
}

export async function getUserLocations() {
  const currentUser = await getCurrentUser();

  try {
    return await prisma.location.findMany({
      where: {
        authorId: currentUser?.id,
      },
      include: {
        category: true,
        author: true,
      },
    });
  } catch (e) {
    throw new Error("something went wrong");
  }
}

export async function getTotalWishlist() {
  const currentUser = await getCurrentUser();
  const total = await prisma.user.findFirst({
    where: { id: currentUser?.id },
    select: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return total;
}

export async function deleteUser() {
  const currentUser = await getCurrentUser();

  try {
    const deleteAccount = await prisma.user.delete({
      where: {
        id: currentUser?.id,
      },
    });

    revalidateTag("user");
    return "user deleted successfully";
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
