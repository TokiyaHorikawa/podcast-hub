"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UpdateUserInput } from "@/lib/types";

export async function updateUser(userId: number, data: UpdateUserInput) {
  const supabase = createServerSupabaseClient();
  const { data: updatedUser, error } = await supabase
    .from("users")
    .update(data)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedUser;
}
