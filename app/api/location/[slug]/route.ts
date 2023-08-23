import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { revalidateTag } from "next/cache";
import imagekit from "@/lib/imagekit";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const location = await prisma.location.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
        liked: true,
      },
    });

    console.log(location);

    return NextResponse.json({ data: location }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    // check if location in database
    const location = await prisma.location.findUnique({
      where: { slug },
    });

    if (!location) {
      return NextResponse.json(
        { error: "location not found" },
        { status: 404 }
      );
    }

    imagekit.deleteFolder(
      `/location-sharing-app/images/${location.slug}`,
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

    const deleteLocation = await prisma.location.delete({
      where: {
        slug,
      },
    });

    revalidateTag("location");
    return NextResponse.json(
      { message: "delete location successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
