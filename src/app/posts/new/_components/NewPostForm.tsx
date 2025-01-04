"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichEditor from "./RichEditor";

export default function NewPostForm() {
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          placeholder="投稿のタイトルを入力してください"
          className="text-lg"
        />
      </div>

      <div className="space-y-2">
        <Label>本文</Label>
        <Card>
          <RichEditor />
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline">下書き保存</Button>
        <Button>投稿する</Button>
      </div>
    </form>
  );
}
