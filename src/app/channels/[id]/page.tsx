import { mockPodcast } from "@/lib/mock";
import type { Podcast } from "@/lib/types";
import type { Metadata } from "next";
import ChannelDetail from "./_components/ChannelDetail";

export const metadata: Metadata = {
  title: "チャンネル詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

type Props = {
  params: {
    id: string;
  };
};

export default function PodcastPage({ params }: Props) {
  // TODO: 実際のデータ取得に置き換える
  const podcast: Podcast = mockPodcast;

  return <ChannelDetail podcast={podcast} />;
}
