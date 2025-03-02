"use server";

import { getUserFromServer } from "@/lib/supabase/getUserFromServer";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CreateContentInput = {
  title: string;
  body: string;
};

export async function createPost(data: CreateContentInput) {
  try {
    const user = await getUserFromServer();

    if (!user) {
      return { error: "認証されていません" };
    }

    const supabase = createServerSupabaseClient();

    const { error } = await supabase.from("contents").insert({
      title: data.title,
      body: data.body,
      userId: user.id,
    });

    if (error) {
      console.error("コンテンツ作成エラー:", error);
      return { error: "コンテンツの作成に失敗しました" };
    }

    return { success: true };
  } catch (error) {
    console.error("予期せぬエラー:", error);
    return { error: "予期せぬエラーが発生しました" };
  }
}
