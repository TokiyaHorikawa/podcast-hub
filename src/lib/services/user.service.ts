import { prisma } from "@/lib/prisma";
import type { User } from "@supabase/supabase-js";

export async function findOrCreateUser(supabaseUser: User) {
  let user = await prisma.users.findUnique({
    where: { uid: supabaseUser.id },
    select: { isAdmin: true },
  });

  if (!user) {
    user = await prisma.users.create({
      data: {
        uid: supabaseUser.id,
        email: supabaseUser.email || "",
        name: supabaseUser.email?.split("@")[0] || "Unknown",
        isAdmin: false,
      },
      select: { isAdmin: true },
    });
  }

  return user;
}
