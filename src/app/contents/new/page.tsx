import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NewPostForm from "./_components/NewPostForm";

export const metadata: Metadata = {
  title: "新規投稿 | PodcastHub",
  description: "Podcastエピソードについての感想や推薦を共有しましょう",
};

export default async function NewPostPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-6">
      <h1 className="text-2xl font-bold mb-6">新規投稿</h1>
      <NewPostForm />
    </div>
  );
}
