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
import { useCallback } from "react";

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

  const setLink = useCallback(() => {
    const url = window.prompt("URL を入力してください:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

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
              <div className="border-b p-2 flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={
                    editor.isActive("heading", { level: 1 })
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  H1
                </Button>
                <Button
                  size="sm"
                  variant={
                    editor.isActive("heading", { level: 2 })
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  H2
                </Button>
                <Button
                  size="sm"
                  variant={editor.isActive("bold") ? "default" : "outline"}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  太字
                </Button>
                <Button
                  size="sm"
                  variant={editor.isActive("italic") ? "default" : "outline"}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  斜体
                </Button>
                <Button
                  size="sm"
                  variant={
                    editor.isActive("bulletList") ? "default" : "outline"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  箇条書き
                </Button>
                <Button
                  size="sm"
                  variant={
                    editor.isActive("orderedList") ? "default" : "outline"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  番号付き
                </Button>
                <Button
                  size="sm"
                  variant={editor.isActive("link") ? "default" : "outline"}
                  onClick={setLink}
                >
                  リンク
                </Button>
              </div>
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
