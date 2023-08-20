import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "berhasil menghapus category" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
