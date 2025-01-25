"use client";

import { PrismaClient } from "@prisma/client";
import supabase from "./supabase";

const prisma = new PrismaClient();

// クライアントコンポーネントを想定している
export async function getUserFromClient() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dbUser = await prisma.users.findFirst({
    where: { email: user.email },
  });

  return dbUser;
}
