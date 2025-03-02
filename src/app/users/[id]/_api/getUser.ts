"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Users } from "@/types";

export async function getUser(id: string): Promise<Users | null> {
  try {
    const supabase = createServerSupabaseClient();

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error || !user) {
      console.error("ユーザー取得エラー:", error);
      return null;
    }

    return user;
  } catch (error) {
    console.error("予期せぬエラー:", error);
    return null;
  }
}
