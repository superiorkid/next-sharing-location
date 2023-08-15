import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";

export default async function getSession() {
  return await getServerSession(authOptions);
}
