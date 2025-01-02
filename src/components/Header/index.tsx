import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserFromServer } from "@/lib/supabase/getUserFromServer";
import Link from "next/link";

async function getUser() {
  const user = await getUserFromServer();
  return user;
}

const Header = async () => {
  const user = await getUser();

  return (
    <header className="w-full h-16 flex items-center justify-between px-4">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Podcast Hub</h1>
      </Link>

      <div className="flex items-center space-x-2">
        {user ? (
          <Link href={`/users/${user.id}`}>
            <Avatar>
              {/* 画像は未対応 */}
              <AvatarImage src="https://avatars.githubusercontent.com/u/33023225?v=4" />
              <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button>ログイン</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
