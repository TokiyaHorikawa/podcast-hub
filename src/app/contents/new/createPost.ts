"use server";

import { prisma } from "@/lib/prisma";

export type CreateContentInput = {
  title: string;
  body: string;
  userId: number;
};

export const createPost = async (input: CreateContentInput) => {
  const post = await prisma.contents.create({
    data: {
      title: input.title,
      body: input.body,
      userId: input.userId,
    },
  });

  return post;
};
