import { prisma } from "@/lib/prismadb";
import getCurrentUser from "@/_actions/get-current-user";
import { User } from "@prisma/client";

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
