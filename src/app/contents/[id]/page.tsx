import { mockEpisode } from "@/lib/mock";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Contents, Users } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "./_components/Article";

export const metadata: Metadata = {
  title: "コンテンツ詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const ContentDetail = async ({ params }: { params: { id: string } }) => {
  const content = await fetchContent(params.id);
  const author =
    content.userId !== null ? await fetchUser(content.userId) : null;

  if (!content || !author) {
    notFound();
  }

  return <Article content={content} author={author} episode={mockEpisode} />;
};

async function fetchContent(id: string): Promise<Contents> {
  const supabase = createServerSupabaseClient();
  const numberId = Number(id);
  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", numberId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function fetchUser(id: number): Promise<Users> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default ContentDetail;
