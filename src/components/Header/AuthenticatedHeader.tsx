"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatorUser from "@/features/users/AvatorUser";
import supabase from "@/lib/supabase/supabase";
import type { User } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthenticatedHeaderProps {
  user: User;
}

const AuthenticatedHeader = ({ user }: AuthenticatedHeaderProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // ログアウト後にページを更新
  };

  return (
    <div className="flex items-center space-x-4">
      <Link href="/contents/new">
        <Button variant="default">投稿する</Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatorUser user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/users/${user.id}`}>
            <DropdownMenuItem>プロフィール</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleSignOut}>
            ログアウト
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthenticatedHeader;
