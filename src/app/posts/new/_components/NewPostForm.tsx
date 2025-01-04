"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menu from "./Menu";

export default function NewPostForm() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
      },
    },
    autofocus: true,
    parseOptions: {
      preserveWhitespace: true,
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

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
        <Tabs defaultValue="write" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write">編集</TabsTrigger>
            <TabsTrigger value="preview">プレビュー</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Card>
              <Menu editor={editor} />
              <EditorContent editor={editor} />
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <Card className="p-4 prose">
              <div className="min-h-[400px]">{editor?.getHTML()}</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-between">
        <Button variant="outline">下書き保存</Button>
        <Button>投稿する</Button>
      </div>
    </form>
  );
}
