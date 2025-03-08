import type { Content, Episode, Podcast, User } from "@/lib/types";

export const mockEpisode: Episode = {
  id: 1,
  title: "モックエピソード",
  description: "これはモックエピソードの説明です。",
  podcastId: 1,
  created_at: new Date().toISOString(),
};

export const mockPodcast: Podcast = {
  id: 1,
  title: "モックポッドキャスト",
  description: "これはモックポッドキャストの説明です。",
  userId: 1,
  created_at: new Date().toISOString(),
};

export const mockUser: User = {
  id: 1,
  name: "テストユーザー",
  email: "test@example.com",
  uid: "test-uid",
  isAdmin: false,
  created_at: new Date().toISOString(),
};

export const mockContent: Content = {
  id: 1,
  title: "モックコンテンツ",
  body: "これはモックコンテンツの本文です。",
  userId: 1,
  created_at: new Date().toISOString(),
};
