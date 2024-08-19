import Article from "@/app/contents/_components/Article";
import type { Content } from "../_components/Article";

const ContentDetail = ({ params }: { params: { id: string } }) => {
  const content: Content = getContent(params.id);
  return <Article content={content} />;
};

// mock
function getContent(id: string): Content {
  return {
    title: `タイトル ${id}`,
    body: `コンテンツ ${id}の詳細な説明です。このコンテンツは、さまざまな情報を提供し、読者にとって有益な内容を含んでいます。さらに、関連するトピックや事例を交えながら、深く掘り下げていきます。最終的には、読者がこの情報を活用できるように、具体的なアクションプランや提案も含めています。`,
    author: {
      name: "山田太郎",
      image: "https://example.com/avatar.jpg",
    },
    publishedAt: "2023年4月1日",
  };
}

export default ContentDetail;
