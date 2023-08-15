import { prisma } from "@/lib/prismadb";
import { User } from ".prisma/client";
import getSession from "@/_actions/get-session";

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
    })) as User;

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}
