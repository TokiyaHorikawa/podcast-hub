"use server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { SignUpParams } from "./useSignUpWithPassword";

async function signUpAuth(
  email: SignUpParams["email"],
  password: SignUpParams["password"],
): Promise<{ userId: string | undefined }> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

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
  const supabase = createServerSupabaseClient();
  try {
    const { error } = await supabase.from("users").insert({
      uid: userId,
      name: username,
      email,
    });

    if (error) {
      console.error("Supabase createUser error:", error);
      throw new Error("ユーザーの作成に失敗しました");
    }
  } catch (error) {
    console.error("Supabase createUser error:", error);
    throw new Error("ユーザーの作成に失敗しました");
  }
}

export async function signUp(params: SignUpParams): Promise<void> {
  const { userId } = await signUpAuth(params.email, params.password);
  if (!userId) {
    throw new Error("ユーザーIDの取得に失敗しました");
  }
  await createUser(userId, params.username, params.email);
}
