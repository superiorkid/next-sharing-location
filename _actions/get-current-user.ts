import { prisma } from "@/lib/prismadb";
import getSession from "@/_actions/get-session";
import { Prisma } from "@prisma/client";

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = (await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        likes: true,
      },
    })) as Prisma.UserGetPayload<{ include: { likes: true } }>;

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}
