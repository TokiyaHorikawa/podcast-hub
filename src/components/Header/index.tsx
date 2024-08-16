import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-4">
      <h1 className="text-2xl font-bold">Podcast Hub</h1>

      <div className="flex items-center space-x-2">
        <Avatar>
          {/* TODO: ユーザーのプロフィール画像を表示 */}
          <AvatarImage src="https://avatars.githubusercontent.com/u/33023225?v=4" />
          <AvatarFallback>User Name</AvatarFallback>
        </Avatar>
        <Button>ログイン</Button>
      </div>
    </header>
  );
};

export default Header;
