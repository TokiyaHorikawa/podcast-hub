"use client";

import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { useCallback } from "react";

const buttonDefaultProps = {
  type: "button",
  size: "sm",
} as const;

const Menu = () => {
  const { editor } = useCurrentEditor();

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
    <div className="border-b p-2 flex gap-2 flex-wrap">
      <Button
        {...buttonDefaultProps}
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        {...buttonDefaultProps}
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        {...buttonDefaultProps}
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        太字
      </Button>
      <Button
        {...buttonDefaultProps}
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        斜体
      </Button>
      <Button
        {...buttonDefaultProps}
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        箇条書き
      </Button>
      <Button
        {...buttonDefaultProps}
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        番号付き
      </Button>
      <Button
        {...buttonDefaultProps}
        variant={editor.isActive("link") ? "default" : "outline"}
        onClick={setLink}
      >
        リンク
      </Button>
    </div>
  );
};

export default Menu;
