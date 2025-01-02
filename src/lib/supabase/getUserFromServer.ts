"use server";

import prisma from "@/lib/prisma";
import type { User } from "@/lib/types";
import { createClient } from "./server";

export async function getUserFromServer(): Promise<User | null> {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: user.email },
  });

  return dbUser;
}
