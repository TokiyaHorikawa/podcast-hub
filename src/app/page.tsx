import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Contents, Users } from "@/types";
import ContentCard from "./_components/ContentCard";

async function getContents() {
  const supabase = createServerSupabaseClient();

  const { data: contents, error } = await supabase
    .from("contents")
    .select("*, user:users(*)")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("コンテンツ取得エラー:", error);
    return [];
  }

  return (contents as (Contents & { user: Users })[]) || [];
}

export default async function Home() {
  const contents = await getContents();

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contents.map((content) => (
          <ContentCard key={content.id.toString()} content={content} />
        ))}
      </div>
    </main>
  );
}
