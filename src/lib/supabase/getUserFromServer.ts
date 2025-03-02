"use server";

import type { Users } from "@/types";
import { createServerSupabaseClient } from "./server";

export async function getUserFromServer(): Promise<Users | null> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return null;
  }

  // Prismaの代わりにSupabaseを使用
  const { data: dbUser, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (dbError || !dbUser) {
    return null;
  }

  return dbUser;
}
