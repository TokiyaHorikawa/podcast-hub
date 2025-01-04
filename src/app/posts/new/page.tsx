import type { Metadata } from "next";
import NewPostForm from "./_components/NewPostForm";

export const metadata: Metadata = {
  title: "新規投稿 | PodcastHub",
  description: "Podcastエピソードについての感想や推薦を共有しましょう",
};

export default function NewPostPage() {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">新規投稿</h1>
      <NewPostForm />
    </div>
  );
}
