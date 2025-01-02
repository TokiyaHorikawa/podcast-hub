"use server";

import prisma from "@/lib/prisma";
import type { User } from "@/lib/types";

export async function getUser(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  return user;
}
