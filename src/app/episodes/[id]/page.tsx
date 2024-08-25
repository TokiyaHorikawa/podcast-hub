import type { Metadata } from "next";
import EpisodeDetail from "../_components/EpisodeDetail";
import type { PodcastEpisode } from "@/lib/types";
import { generateMockEpisode } from "@/lib/mock";

export const metadata: Metadata = {
  title: "エピソード詳細 - Podcast Hub",
  description: "Podcastに貢献できる場所",
};

const EpisodePage = ({ params }: { params: { id: string } }) => {
  const episode: PodcastEpisode = getEpisode(params.id);
  return <EpisodeDetail episode={episode} />;
};

// モックデータを生成する関数
function getEpisode(id: string): PodcastEpisode {
  return generateMockEpisode(id);
}

export default EpisodePage;
