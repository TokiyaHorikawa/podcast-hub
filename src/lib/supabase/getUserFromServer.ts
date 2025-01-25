"use server";

import { prisma } from "@/lib/prisma";
import type { User } from "@/lib/types";
import { createServerSupabaseClient } from "./server";

export async function getUserFromServer(): Promise<User | null> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const dbUser = await prisma.users.findFirst({
    where: { email: user.email },
  });

  return dbUser;
}
