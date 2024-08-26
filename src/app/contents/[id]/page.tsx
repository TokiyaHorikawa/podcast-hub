import type { Metadata } from "next";
import Article from "@/app/contents/_components/Article";
import type { Content } from "@/lib/types";
import { generateMockContent } from "@/lib/mock";

export const metadata: Metadata = {
  title: "コンテンツ詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const ContentDetail = ({ params }: { params: { id: string } }) => {
  const content: Content = getContent(params.id);
  return <Article content={content} />;
};

// mock
function getContent(id: string): Content {
  return generateMockContent(id);
}

export default ContentDetail;
