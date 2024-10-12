"use client";

import supabase from "./supabase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// クライアントコンポーネントを想定している
export async function getUserFromClient() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: user.email },
  });

  return dbUser;
}
