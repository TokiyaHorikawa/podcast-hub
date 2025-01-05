import type { Channel, Episode } from "@/lib/types";

export function generateMockEpisode(id: string): Episode {
  return {
    id: Number(id),
    title: `エピソード ${id} のタイトル`,
    description: `これはエピソード ${id} の詳細な説明です。このポッドキャストエピソードでは、興味深いトピックについて議論し、リスナーに価値ある情報を提供します。`,
    imageUrl:
      "https://i.scdn.co/image/ab67656300005f1fb412cc05140e5eedc61ac87d",
    channel: generateMockChannel("1"),
    podcastId: Number(id),
    createdAt: new Date(),
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
