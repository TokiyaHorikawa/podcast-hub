import { getUserFromServer } from "@/lib/supabase/getUserFromServer";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import EditUserForm from "./_components/EditUserForm";

export const metadata: Metadata = {
  title: "プロフィール編集 | PodcastHub",
  description: "プロフィール情報を編集できます",
};

interface Props {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: Props) {
  const currentUser = await getUserFromServer();

  if (!currentUser || currentUser.id !== Number(params.id)) {
    redirect("/");
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">プロフィール編集</h1>
      <EditUserForm user={currentUser} />
    </div>
  );
}
