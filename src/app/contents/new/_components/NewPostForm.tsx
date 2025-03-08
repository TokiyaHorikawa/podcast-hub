"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createPost } from "../createPost";
import RichEditor from "./RichEditor";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(50, "タイトルは50文字以内で入力してください"),
  content: z.string().max(2000, "本文は2000文字以内で入力してください"),
});

type FormValues = z.infer<typeof postSchema>;

type Props = {
  user: User;
};

export default function NewPostForm({ user }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      const { content } = await createPost({
        title: values.title,
        body: values.content,
        userId: user.id,
      });

      router.push(`/contents/${content.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          placeholder="投稿のタイトルを入力してください"
          className="text-lg"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-sm text-red-500">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>本文</Label>
        <Card>
          <RichEditor
            value={form.watch("content")}
            onChange={(value: string) => form.setValue("content", value)}
          />
        </Card>
        {form.formState.errors.content && (
          <p className="text-sm text-red-500">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" disabled={isLoading}>
          下書き保存
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "投稿中..." : "投稿する"}
        </Button>
      </div>
    </form>
  );
}
