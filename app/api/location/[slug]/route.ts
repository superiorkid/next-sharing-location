import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

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
      },
    });

    return NextResponse.json({ data: location }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
