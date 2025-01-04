import { getUserFromServer } from "@/lib/supabase/getUserFromServer";
import Link from "next/link";
import AuthenticatedHeader from "./AuthenticatedHeader";
import LoginButton from "./LoginButton";

async function getUser() {
  const user = await getUserFromServer();
  return user;
}

const Header = async () => {
  const user = await getUser();
  const isLogin = !!user;

  return (
    <header className="w-full h-16 flex items-center justify-between px-4">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Podcast Hub</h1>
      </Link>

      <div className="flex items-center space-x-2">
        {isLogin ? <AuthenticatedHeader user={user} /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
