"use server";

import slugify from "slugify";
import { prisma } from "@/lib/prismadb";
import imagekit from "@/lib/imagekit";
import getCurrentUser from "@/_actions/get-current-user";
import { revalidateTag } from "next/cache";
import { Prisma } from ".prisma/client";
import { NextResponse } from "next/server";
import { addLocationSchema } from "@/lib/validations/location.validation";
import { z } from "zod";

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        author: true,
      },
    });
    return locations;
  } catch (error) {
    throw new Error("failed to get locations");
  }
};

export const getInfiniteLocations = async (
  page: number,
  category?: string,
  sort: "desc" | "asc" = "desc"
) => {
  const perPage: number = 10;
  try {
    return await prisma.location.findMany({
      where: {
        category: {
          name: category ?? undefined,
        },
      },
      skip: page * perPage,
      take: perPage,
      orderBy: {
        createdAt: sort,
      },
    });
  } catch (error) {
    console.log(error);
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
      include: { author: true; category: true; liked: true };
    }>;
  } catch (e) {
    throw new Error("terjadi kesalahan pada server.");
  }
};

export const getLocationById = async (id: string) => {
  try {
    return await prisma.location.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
        author: true,
      },
    });
  } catch (e) {
    throw new Error("terjadi kesalahan pada server.");
  }
};

export const addLocation = async (values: FormData) => {
  const getValue = <T>(key: string): T | null =>
    values.get(key) as unknown as T;

  const currentUser = await getCurrentUser();

  const name = getValue<string>("name")?.toLowerCase();
  const description = getValue<string>("description")?.toLowerCase();
  const address = getValue<string>("address")?.toLowerCase();
  const category = getValue<string>("category");
  const coordinate = getValue<string>("coordinate");
  const website = getValue<string | null>("website")?.toLowerCase();
  const instagram = getValue<string | null>("instagram")?.toLowerCase();
  const facebook = getValue<string | null>("facebook")?.toLowerCase();
  const whatsapp = getValue<string | null>("whatsapp")?.toLowerCase();

  const images: File[] | null = values.getAll("images[]") as unknown as File[];

  console.log(coordinate)

  if (!coordinate) {
    console.log("coordinate tidak boleh kosong");
    throw new Error("Coordinate tidak boleh kosong");
  }

  const slug = slugify(name!);
  const checkLocation = await prisma.location.findUnique({
    where: {
      slug,
    },
  });

  if (checkLocation) {
    throw new Error("lokasi sudah terdaftar.");
  }

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

  const checkCategory = await prisma.category.findUnique({
    where: {
      name: category as string,
    },
  });

  const photos = await Promise.all(uploadPromises);

  try {
    const newLocation = await prisma.location.create({
      data: {
        slug,
        coordinate: coordinate as string,
        photos: photos as string[],
        name: name as string,
        description: description as string,
        address: address as string,
        whatsapp: whatsapp as string,
        instagram: instagram as string,
        facebook: facebook as string,
        website: website as string,
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
  } catch (e) {
    throw new Error("terjadi kesalahan pada server.");
  }
};

export const updateLocation = async (id: string, values: FormData) => {
  const getValue = <T>(key: string): T | null =>
    values.get(key) as unknown as T;

  const name = getValue<string>("name")?.toLowerCase();
  const description = getValue<string>("description")?.toLowerCase();
  const address = getValue<string>("address")?.toLowerCase();
  const category = getValue<string>("category");
  const coordinate = getValue<string>("coordinate");
  const images: File[] | string | null = values.getAll(
    "photos[]"
  ) as unknown as File[];
  const website = getValue<string>("website")?.toLowerCase();
  const facebook = getValue<string>("facebook")?.toLowerCase();
  const instagram = getValue<string>("instagram")?.toLowerCase();
  const whatsapp = getValue<string>("whatsapp")?.toLowerCase();

  let photos;

  // check if file or not
  const isFile = images?.at(0)?.type;
  const location = await getLocationById(id);

  if (isFile) {
    // delete current folder and files inside
    imagekit.deleteFolder(
      `/location-sharing-app/images/${location?.slug}`,
      async (err, response) => {
        if (err) {
          return NextResponse.json(
            { error: "imagekit operation failed" },
            { status: 500 }
          );
        } else {
          console.log("imagekit operation successfully");
        }
      }
    );

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

    photos = await Promise.all(uploadPromises);
  } else {
    photos = (images?.at(0) as unknown as string)?.split(",");
  }

  try {
    const checkCategory = await prisma.category.findUnique({
      where: {
        name: category as string,
      },
    });

    const updateLocation = await prisma.location.update({
      where: {
        id,
      },
      data: {
        slug: slugify(name as string),
        name: name as string,
        coordinate: coordinate as string,
        description: description as string,
        address: address as string,
        photos: photos as string[],
        whatsapp: whatsapp,
        website: website,
        facebook: facebook,
        instagram: instagram,
        category: {
          connect: {
            id: checkCategory?.id,
          },
        },
      },
    });

    revalidateTag("location");
    return "update location successfully";
  } catch (error) {
    throw new Error("terjadi kesalahan pada server");
  }
};

export const getLocationComments = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${slug}`,
      {
        next: {
          tags: ["comment", "location"],
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

export const getLocationTotals = async () => {
  return await prisma.location.count();
};

// export const deleteLocation = async (id: string) => {
//   console.log("delete location ID: ", id);
//   const location = await getLocationById(id);
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/location/${location?.slug}`,
//       { method: "DELETE" }
//     );
//
//     if (!res.ok) {
//       throw new Error("failed to delete location");
//     }
//
//     revalidateTag("location");
//     return "berhasil menghapus lokasi";
//   } catch (error) {
//     throw new Error("gagal menghapus lokasi");
//   }
// };

export const deleteLocation = async (id: string) => {
  const location = await getLocationById(id);
  try {
    imagekit.deleteFolder(
      `/location-sharing-app/images/${location?.slug}`,
      async (err, response) => {
        if (err) {
          return NextResponse.json(
            { error: "imagekit operation failed" },
            { status: 500 }
          );
        } else {
          console.log("imagekit operation successfully");
        }
      }
    );

    const delLocation = await prisma.location.delete({
      where: {
        id: location?.id,
      },
    });

    return "delete lokasi berhasil";
  } catch (error) {
    throw new Error("gagal menghapus lokasi");
  }
};

export const searchLocation = async (query: string) => {
  try {
    const result = await prisma.location.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 5,
    });

    return result;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const getWishlistTotal = async (slug: string) => {
  try {
    const wishlistTotal = await prisma.location.findUnique({
      where: {
        slug,
      },
      select: {
        _count: {
          select: {
            liked: true,
          },
        },
      },
    });
    return wishlistTotal;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const getRecommendation = async () => {
  const recommendation = await prisma.location.findMany({
    take: 10,
    orderBy: {
      liked: {
        _count: "desc",
      },
    },
    include: {
      author: true,
      category: true,
      liked: true,
    },
  });

  if (!recommendation) {
    throw new Error("No recommendations found");
  }

  return recommendation;
};

export const addToWishlist = async (slug: string) => {
  const currentUser = await getCurrentUser();

  const location = await prisma.location.findFirst({
    where: {
      slug,
    },
  });

  if (currentUser && location) {
    await prisma.location.update({
      where: {
        id: location.id,
      },
      data: {
        liked: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    revalidateTag("location");
    return "added to wishlist";
  } else {
    throw new Error("user not found");
  }
};

export const removeFromWishlist = async (slug: string) => {
  const currentUser = await getCurrentUser();

  const location = await prisma.location.findFirst({
    where: {
      slug,
    },
  });

  if (currentUser && location) {
    await prisma.location.update({
      where: {
        id: location.id,
      },
      data: {
        liked: {
          disconnect: {
            id: currentUser.id,
          },
        },
      },
    });

    revalidateTag("location");
    return "remove from wishlist";
  } else {
    throw new Error("user not found");
  }
};

export const getLocationByCategory = async (param: string) => {
  const categories = await prisma.location.findMany({
    where: {
      category: {
        name: param,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};
