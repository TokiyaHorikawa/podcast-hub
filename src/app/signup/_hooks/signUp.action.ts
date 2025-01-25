"use server";
import supabase from "@/lib/supabase/supabase";
import { PrismaClient } from "@prisma/client";
import type { SignUpParams } from "./useSignUpWithPassword";

async function signUpAuth(
  email: SignUpParams["email"],
  password: SignUpParams["password"],
): Promise<{ userId: string | undefined }> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("Supabase signUp error:", error);
    throw new Error("認証に失敗しました");
  }

  return { userId: data?.user?.id };
}

async function createUser(
  userId: string,
  username: SignUpParams["username"],
  email: SignUpParams["email"],
): Promise<void> {
  const prisma: PrismaClient = new PrismaClient();
  try {
    await prisma.users.create({
      data: { uid: userId, name: username, email },
    });
  } catch (error) {
    console.error("Prisma createUser error:", error);
    throw new Error("ユーザーの作成に失敗しました");
  } finally {
    await prisma.$disconnect();
  }
}

export async function signUp({ email, password, username }: SignUpParams) {
  try {
    const { userId } = await signUpAuth(email, password);
    if (!userId) throw new Error("ユーザーIDが取得できませんでした。");

    await createUser(userId, username, email);
    return true;
  } catch (error) {
    console.error("signUp error:", error);
    if (!(error instanceof Error))
      throw new Error("ユーザー登録に失敗しました");

    throw new Error(error.message || "ユーザー登録に失敗しました");
  }
}
