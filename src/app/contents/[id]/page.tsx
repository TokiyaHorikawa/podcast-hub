import Article from "@/app/contents/_components/Article";
import { generateMockEpisode } from "@/lib/mock";
import type { Content, User } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コンテンツ詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const prisma: PrismaClient = new PrismaClient();

const mockUser: User = {
  id: 1,
  name: "山田太郎",
  uid: "user1",
  email: "user1@example.com",
  createdAt: new Date(),
};

const ContentDetail = async ({ params }: { params: { id: string } }) => {
  const content = await getContent(params.id);
  const author = mockUser;
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
