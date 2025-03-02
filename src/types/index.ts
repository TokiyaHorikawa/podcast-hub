// データベース型のエクスポート
export * from "./database.types";

// Zodスキーマのエクスポート
export * from "./zod-schemas";

// 型のエイリアス（Prismaの型と互換性を持たせるため）
import type { z } from "zod";
import type {
  contentsRowSchema,
  episodesRowSchema,
  podcastsRowSchema,
  usersRowSchema,
} from "./zod-schemas";

// Prismaの型と同じ名前で型を提供
export type Users = z.infer<typeof usersRowSchema>;
export type Contents = z.infer<typeof contentsRowSchema>;
export type Podcasts = z.infer<typeof podcastsRowSchema>;
export type Episodes = z.infer<typeof episodesRowSchema>;
