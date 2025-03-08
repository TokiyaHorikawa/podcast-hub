import type { Database } from "@/types/database.types";

export type Content = Database["public"]["Tables"]["contents"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Podcast = Database["public"]["Tables"]["podcasts"]["Row"];
export type Episode = Database["public"]["Tables"]["episodes"]["Row"];

export type CreateContentInput = {
  title: string;
  body: string;
  userId?: number;
};

export type CreateUserInput = {
  name: string;
  email: string;
  bio?: string;
};

export type UpdateUserInput = {
  name?: string;
  bio?: string;
};
