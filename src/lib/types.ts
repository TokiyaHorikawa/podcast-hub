export interface Content {
  title: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  type: "showNote" | "annotation" | "review";
  episode: Episode;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // エピソードの画像は不要かも？
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}
