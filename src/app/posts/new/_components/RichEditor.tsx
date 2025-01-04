"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menu from "./Menu";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Link.configure({
    openOnClick: false,
  }),
  Image,
];

const RichEditor = () => {
  return (
    <EditorProvider
      extensions={extensions}
      slotBefore={<Menu />}
      immediatelyRender={false}
      editorProps={{
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
        },
      }}
    />
  );
};

export default RichEditor;
