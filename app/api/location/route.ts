import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const locations = await prisma.location.findMany({
      include: {
        category: true,
        author: true,
      },
    });
    return NextResponse.json({ data: locations }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "terjadi kesalahan terhadap server" },
      { status: 500 }
    );
  }
}
