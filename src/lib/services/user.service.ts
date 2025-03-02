import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function findOrCreateUser(supabaseUser: User) {
  const supabase = createServerSupabaseClient();

  // Supabaseを使用してユーザーを検索
  const { data: user, error } = await supabase
    .from("users")
    .select("isAdmin")
    .eq("uid", supabaseUser.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116はレコードが見つからないエラー
    throw error;
  }

  if (!user) {
    // ユーザーが存在しない場合は作成
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        uid: supabaseUser.id,
        email: supabaseUser.email || "",
        name: supabaseUser.email?.split("@")[0] || "Unknown",
        isAdmin: false,
      })
      .select("isAdmin")
      .single();

    if (insertError) {
      throw insertError;
    }

    return newUser;
  }

  return user;
}
