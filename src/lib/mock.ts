import type { Author, Channel, Content, Episode } from "@/lib/types";

export function generateMockContent(id: bigint): Content {
  return {
    id,
    title: `タイトル ${id}`,
    body: `コンテンツ ${id}の詳細な説明です。このコンテンツは、さまざまな情報を提供し、読者にとって有益な内容を含んでいます。さらに、関連するトピックや事例を交えながら、深く掘り下げていきます。最終的には、読者がこの情報を活用できるように、具体的なアクションプランや提案も含めています。`,
  };
}

export function generateMockAuthor(): Author {
  return {
    name: "山田太郎",
    image: "https://example.com/avatar.jpg",
  };
}

export function generateMockEpisode(id: string): Episode {
  return {
    id,
    title: `エピソード ${id} のタイトル`,
    description: `これはエピソード ${id} の詳細な説明です。このポッドキャストエピソードでは、興味深いトピックについて議論し、リスナーに価値ある情報を提供します。`,
    imageUrl:
      "https://i.scdn.co/image/ab67656300005f1fb412cc05140e5eedc61ac87d",
    channel: generateMockChannel("1"),
  };
}

export function generateMockChannel(id: string): Channel {
  return {
    id,
    name: `チャンネル ${id} のタイトル`,
    description: `これはチャンネル ${id} の詳細な説明です。このポッドキャストチャンネルでは、興味深いトピックについて議論し、リスナーに価値ある情報を提供します。`,
    imageUrl:
      "https://i.scdn.co/image/ab67656300005f1fb412cc05140e5eedc61ac87d",
  };
}
