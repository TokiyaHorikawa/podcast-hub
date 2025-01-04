"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import RichEditor from "./RichEditor";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(50, "タイトルは50文字以内で入力してください"),
  content: z.string().max(2000, "本文は2000文字以内で入力してください"),
});

type FormValues = z.infer<typeof postSchema>;

export default function NewPostForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // TODO: 投稿処理の実装
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          placeholder="投稿のタイトルを入力してください"
          className="text-lg"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>本文</Label>
        <Card>
          <RichEditor
            value={watch("content")}
            onChange={(value: string) => setValue("content", value)}
          />
        </Card>
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline">
          下書き保存
        </Button>
        <Button type="submit">投稿する</Button>
      </div>
    </form>
  );
}
