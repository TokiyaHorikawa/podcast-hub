"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import RichEditor from "./RichEditor";

type FormValues = {
  title: string;
  content: string;
};

export default function NewPostForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
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
          {...register("title", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label>本文</Label>
        <Card>
          <RichEditor
            value={watch("content")}
            onChange={(value: string) => setValue("content", value)}
          />
        </Card>
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
