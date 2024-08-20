export interface Content {
  title: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  type: "showNote" | "annotation" | "review";
  podcastEpisode: PodcastEpisode;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
