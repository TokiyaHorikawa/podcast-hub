import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getUsers() {
  const supabase = createServerComponentClient({ cookies });
  const { data: users, error } = await supabase
    .from("users")
    .select("id, name, email, is_admin, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return users;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ユーザー一覧</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>管理者</TableHead>
              <TableHead>作成日時</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.is_admin ? "はい" : "いいえ"}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString("ja-JP")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
