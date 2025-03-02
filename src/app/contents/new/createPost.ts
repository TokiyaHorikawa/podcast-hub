"use server";

import { prisma } from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CreateContentInput = {
  title: string;
  body: string;
  userId: number;
};

export const createPost = async (input: CreateContentInput) => {
  const supabase = createServerSupabaseClient();

  const { data: post, error } = await supabase
    .from("contents")
    .insert({
      title: input.title,
      body: input.body,
      userId: input.userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return post;
};
