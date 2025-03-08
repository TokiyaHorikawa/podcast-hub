"use client";

import type { Users } from "@/types";
import supabase from "./client";

// クライアントコンポーネントを想定している
export async function getUserFromClient(): Promise<Users | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return null;
  }

  // Prismaの代わりにSupabaseを使用
  const { data: dbUser, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (error || !dbUser) {
    return null;
  }

  return dbUser;
}
