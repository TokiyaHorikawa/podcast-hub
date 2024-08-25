import type { Content, PodcastEpisode, Channel } from "@/lib/types";

export function generateMockContent(id: string): Content {
  return {
    title: `タイトル ${id}`,
    body: `コンテンツ ${id}の詳細な説明です。このコンテンツは、さまざまな情報を提供し、読者にとって有益な内容を含んでいます。さらに、関連するトピックや事例を交えながら、深く掘り下げていきます。最終的には、読者がこの情報を活用できるように、具体的なアクションプランや提案も含めています。`,
    author: {
      name: "山田太郎",
      image: "https://example.com/avatar.jpg",
    },
    publishedAt: "2023年4月1日",
    type: "showNote",
    podcastEpisode: generateMockEpisode("1"),
  };
}

export function generateMockEpisode(id: string): PodcastEpisode {
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
