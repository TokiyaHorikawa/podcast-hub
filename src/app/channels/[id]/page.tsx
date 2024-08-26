import type { Metadata } from "next";
import ChannelDetail from "./_components/ChannelDetail";
import type { Channel } from "@/lib/types";
import { generateMockChannel } from "@/lib/mock";

export const metadata: Metadata = {
  title: "チャンネル詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const ChannelPage = ({ params }: { params: { id: string } }) => {
  const channel: Channel = getChannel(params.id);
  return <ChannelDetail channel={channel} />;
};

function getChannel(id: string): Channel {
  return generateMockChannel(id);
}

export default ChannelPage;
