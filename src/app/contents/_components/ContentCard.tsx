import { Card } from "@/components/ui/card";

const ContentCard = async ({ id }: { id: string }) => {
  const content = await getContent(id);
  return (
    <Card className="h-40 p-4">
      <div>{content.title}</div>
      <div>{content.description}</div>
    </Card>
  );
};

const getContent = async (id: string) => {
  // const res = await fetch(`http://localhost:3000/api/contents/${id}`);
  // const data = await res.json();

  // 仮のデータ
  const data = {
    id: id,
    title: `ID: ${id}のタイトル`,
    description: `ID: ${id}の説明。<br>改行ありである程度長い文章を記載します。<br>改行ありである程度長い文章を記載します。<br>改行ありである程度長い文章を記載します。`,
  };
  return data;
};

export default ContentCard;
