"use server";

import { TComment } from "@/lib/validations/comment.validation";
import getCurrentUser from "@/_actions/get-current-user";
import { getLocation } from "@/_actions/location.action";
import { prisma } from "@/lib/prismadb";
import { revalidateTag } from "next/cache";

export const addNewComment = async (
  comment: TComment,
  locationSlug: string
) => {
  const currentUser = await getCurrentUser();
  const location = await getLocation(locationSlug);

  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: comment.comment,
        reviewer: {
          connect: {
            id: currentUser?.id,
          },
        },
        location: {
          connect: {
            id: location.id,
          },
        },
      },
    });

    revalidateTag("comment");
    return "komen baru berhasil dibuat";
  } catch (error) {
    throw new Error("terjadi kesalahan di server. silahkan coba lagi");
  }
};
