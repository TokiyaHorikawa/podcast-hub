import EpisodeDetail from "../_components/EpisodeDetail";
import type { PodcastEpisode } from "@/lib/types";

const EpisodePage = ({ params }: { params: { id: string } }) => {
  const episode: PodcastEpisode = getEpisode(params.id);
  return <EpisodeDetail episode={episode} />;
};

// モックデータを生成する関数
function getEpisode(id: string): PodcastEpisode {
  return {
    id,
    title: `エピソード ${id} のタイトル`,
    description: `これはエピソード ${id} の詳細な説明です。このポッドキャストエピソードでは、興味深いトピックについて議論し、リスナーに価値ある情報を提供します。`,
    imageUrl:
      "https://i.scdn.co/image/ab67656300005f1fb412cc05140e5eedc61ac87d",
  };
}

export default EpisodePage;
