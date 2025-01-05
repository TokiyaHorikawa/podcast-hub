import { generateMockEpisode } from "@/lib/mock";
import { prisma } from "@/lib/prisma";
import type { Content, User } from "@/lib/types";
import type { Metadata } from "next";
import Article from "./_components/Article";

export const metadata: Metadata = {
  title: "コンテンツ詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const ContentDetail = async ({ params }: { params: { id: string } }) => {
  const content = await fetchContent(params.id);
  const author = await fetchUser(content.userId);
  const episode = generateMockEpisode(params.id);

  return <Article content={content} author={author} episode={episode} />;
};

async function fetchContent(id: string): Promise<Content> {
  const numberId = Number(id);
  const data = await prisma.content.findUnique({
    where: { id: numberId },
  });

  if (!data) {
    throw new Error("Content not found");
  }

  return data;
}

async function fetchUser(id: number): Promise<User> {
  const data = await prisma.user.findUnique({
    where: { id },
  });

  if (!data) {
    throw new Error("User not found");
  }

  return data;
}

export default ContentDetail;
