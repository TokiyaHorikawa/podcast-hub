import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";

type CountableTables = "users" | "podcasts" | "contents";

// カウントの抽象化関数 後で utils かに切り出したい
async function getCount(target: CountableTables): Promise<number | null> {
  const supabase = createServerSupabaseClient();
  const { count, error } = await supabase.from(target).select("*", {
    count: "exact",
    head: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return count;
}

async function getStats() {
  const supabase = createServerSupabaseClient();

  const [userCount, podcastCount, contentCount] = await Promise.all([
    getCount("users"),
    getCount("podcasts"),
    getCount("contents"),
  ]);

  return {
    userCount,
    podcastCount,
    contentCount,
  };
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/users">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ユーザー数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.userCount}</div>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ポッドキャスト数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.podcastCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">コンテンツ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contentCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
