import { prisma } from "@/lib/prisma";
import { getUserFromServer } from "@/lib/supabase/getUserFromServer";
import type { Content } from "@/lib/types";
import { getUser } from "./_api/getUser";
import UserContents from "./_components/UserContents.ui";
import UserProfile from "./_components/UserProfile.ui";

interface Props {
  params: {
    id: string;
  };
}

async function getContents(id: string): Promise<Content[]> {
  const contents = await prisma.content.findMany({
    where: {
      userId: Number(id),
    },
  });
  return contents || [];
}

const UserPage = async ({ params }: Props) => {
  // ユーザー情報の取得
  const currentUser = await getUserFromServer();
  const user = await getUser(params.id);
  const isCurrentUser = currentUser?.id === user?.id;

  if (!user) return <div>ユーザーが見つかりません</div>;

  // ユーザーの投稿を取得
  const contents = await getContents(params.id);

  return (
    <div className="container mx-auto py-8">
      <UserProfile user={user} isCurrentUser={isCurrentUser} />
      <UserContents contents={contents} />
    </div>
  );
};

export default UserPage;
