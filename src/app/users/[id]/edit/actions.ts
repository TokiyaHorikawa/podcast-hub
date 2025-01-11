"use server";

import { prisma } from "@/lib/prisma";
import { getUserFromServer } from "@/lib/supabase/getUserFromServer";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
});

export async function updateUser(userId: string, formData: FormData) {
  const currentUser = await getUserFromServer();

  if (!currentUser || currentUser.id !== Number(userId)) {
    throw new Error("権限がありません");
  }

  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    throw new Error("名前は必須です");
  }

  const validationResult = updateUserSchema.safeParse({ name });

  if (!validationResult.success) {
    throw new Error(validationResult.error.errors[0].message);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name: validationResult.data.name,
    },
  });

  revalidatePath(`/users/${userId}`);

  return updatedUser;
}
