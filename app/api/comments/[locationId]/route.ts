import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { getLocation } from "@/_actions/location.action";

export async function GET(
  request: Request,
  { params: { locationId } }: { params: { locationId: string } }
) {
  try {
    const getComments = await prisma.comment.findMany({
      where: {
        locationIDs: locationId,
      },
      include: {
        reviewer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: getComments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "terjadi kesalahan terhadap server" },
      { status: 500 }
    );
  }
}
