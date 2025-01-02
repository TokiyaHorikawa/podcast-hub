export interface Content {
  id: bigint;
  title: string;
  body: string;
}

export interface Author {
  name: string;
  image: string;
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

export interface User {
  id: number;
  name: string;
  uid: string;
  email: string;
  createdAt: Date;
}
