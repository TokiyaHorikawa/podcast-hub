import type { Metadata } from "next";
import Article from "@/app/contents/_components/Article";
import type { Content } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { generateMockAuthor, generateMockEpisode } from "@/lib/mock";
export const metadata: Metadata = {
  title: "コンテンツ詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const ContentDetail = async ({ params }: { params: { id: string } }) => {
  const content = await getContent(params.id);
  const author = generateMockAuthor();
  const episode = generateMockEpisode(params.id);
  return <Article content={content} author={author} episode={episode} />;
};

async function getContent(id: string): Promise<Content> {
  const supabase = createClient();
  const { data } = await supabase
    .from("contents")
    .select("*")
    .eq("id", id)
    .single();

  return {
    id: data.id,
    title: data.title,
    body: data.body,
  };
}

export default ContentDetail;
