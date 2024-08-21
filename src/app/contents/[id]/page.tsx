import Article from "@/app/contents/_components/Article";
import type { Content } from "@/lib/types";
import { generateMockContent } from "@/lib/mock";

const ContentDetail = ({ params }: { params: { id: string } }) => {
  const content: Content = getContent(params.id);
  return <Article content={content} />;
};

// mock
function getContent(id: string): Content {
  return generateMockContent(id);
}

export default ContentDetail;
