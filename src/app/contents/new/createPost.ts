"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

import type { Content, CreateContentInput } from "@/lib/types";

type Props = CreateContentInput;

type ReturnType = {
  content: Content;
};

export async function createPost({
  title,
  body,
  userId,
}: Props): Promise<ReturnType> {
  try {
    const supabase = createServerSupabaseClient();
    const response = await supabase
      .from("contents")
      .insert({
        title,
        body,
        userId,
      })
      .select()
      .single();

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { content: response.data };
  } catch (error: unknown) {
    console.error("Error creating post:", error);
    throw error;
  }
}
