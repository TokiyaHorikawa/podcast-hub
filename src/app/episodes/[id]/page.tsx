import EpisodeDetail from "../_components/EpisodeDetail";
import type { PodcastEpisode } from "@/lib/types";
import { generateMockEpisode } from "@/lib/mock";

const EpisodePage = ({ params }: { params: { id: string } }) => {
  const episode: PodcastEpisode = getEpisode(params.id);
  return <EpisodeDetail episode={episode} />;
};

// モックデータを生成する関数
function getEpisode(id: string): PodcastEpisode {
  return generateMockEpisode(id);
}

export default EpisodePage;
