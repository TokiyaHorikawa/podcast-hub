import type {
  Contents as PrismaContent,
  Episodes as PrismaEpisode,
  Users as PrismaUser,
} from "@prisma/client";

export type Content = PrismaContent;
export type User = PrismaUser;

// Episodeは現在のスキーマと異なる追加フィールドがあるため、拡張して定義
export interface Episode extends PrismaEpisode {
  imageUrl: string;
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}
