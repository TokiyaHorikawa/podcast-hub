import { mockEpisode, mockPodcast } from "@/lib/mock";
import type { Episode } from "@/lib/types";
import type { Metadata } from "next";
import EpisodeDetail from "../_components/EpisodeDetail";

export const metadata: Metadata = {
  title: "エピソード詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const EpisodePage = ({ params }: { params: { id: string } }) => {
  const episode = {
    ...mockEpisode,
    podcast: mockPodcast,
  };
  return <EpisodeDetail episode={episode} />;
};

export default EpisodePage;
