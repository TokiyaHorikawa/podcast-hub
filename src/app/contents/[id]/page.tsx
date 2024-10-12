import type { Metadata } from "next";
import Article from "@/app/contents/_components/Article";
import type { Content } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { generateMockAuthor, generateMockEpisode } from "@/lib/mock";

export const metadata: Metadata = {
  title: "コンテンツ詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const prisma: PrismaClient = new PrismaClient();

const ContentDetail = async ({ params }: { params: { id: string } }) => {
  const content = await getContent(params.id);
  const author = generateMockAuthor();
  const episode = generateMockEpisode(params.id);
  return <Article content={content} author={author} episode={episode} />;
};

async function getContent(id: string): Promise<Content> {
  const numberId = Number(id);
  const data = await prisma.content.findUnique({
    where: { id: numberId },
  });

  if (!data) {
    throw new Error("Content not found");
  }

  return {
    id: data.id,
    title: data.title,
    body: data.body,
  };
}

export default ContentDetail;
