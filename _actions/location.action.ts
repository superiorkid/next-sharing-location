"use server";

import slugify from "slugify";
import { prisma } from "@/lib/prismadb";
import imagekit from "@/lib/imagekit";
import getCurrentUser from "@/_actions/get-current-user";
import { revalidateTag } from "next/cache";
import { Location, Prisma } from ".prisma/client";
import { NextResponse } from "next/server";
import { Comment } from "@prisma/client";

export const getLocations = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/location`,
      {
        method: "GET",
        next: {
          tags: ["location"],
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

export const getLocation = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/location/${slug}`,
      {
        next: {
          tags: ["location"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("tidak dapat mendapatkan data lokasi");
    }

    const { data } = await res.json();
    return data as Prisma.LocationGetPayload<{
      include: { author: true; category: true };
    }>;
  } catch (e) {
    throw new Error("terjadi kesalahan pada server.");
  }
};

export const addLocation = async (values: FormData) => {
  const getValue = <T>(key: string): T | null =>
    values.get(key) as unknown as T;

  const currentUser = await getCurrentUser();

  const name = getValue<string>("name");
  const description = getValue<string>("description");
  const street = getValue<string>("street");
  const address = getValue<string>("address");
  const category = getValue<string>("category");
  const images: File[] | null = values.getAll("images[]") as unknown as File[];

  const uploadPromises = images.map((image) => {
    return new Promise(async (resolve, reject) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      imagekit.upload(
        {
          file: buffer,
          fileName: image.name,
          useUniqueFileName: true,
          folder: `/location-sharing-app/images/${slugify(name as string)}`,
        },
        (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response?.filePath);
          }
        }
      );
    });
  });

  try {
    const slug = slugify(name!);
    const checkLocation = await prisma.location.findUnique({
      where: {
        slug,
      },
    });

    if (checkLocation) {
      throw new Error("lokasi sudah terdaftar.");
    }

    const checkCategory = await prisma.category.findUnique({
      where: {
        name: category as string,
      },
    });

    const photos = await Promise.all(uploadPromises);

    const newLocation = await prisma.location.create({
      data: {
        slug,
        photos: photos as string[],
        name: name!,
        description: description!,
        street: street!,
        address: address!,
        category: {
          connect: {
            id: checkCategory?.id,
          },
        },
        author: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    });

    revalidateTag("location");
    return "new location added successfully";
  } catch (error) {
    throw new Error("terjadi kesalahan pada server.");
  }
};

export const getLocationComments = async (locationId: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/comments/${locationId}`,
      {
        next: {
          tags: ["comment"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comment");
    }

    const { data } = await res.json();
    return data as Prisma.CommentGetPayload<{ include: { reviewer: true } }>[];
  } catch (error) {
    throw new Error("terjadi kesalahn terhadap server");
  }
};
