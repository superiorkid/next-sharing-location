import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "add new category" }, { status: 200 });
}

export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
