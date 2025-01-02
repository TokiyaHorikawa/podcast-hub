import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";

interface Props {
  user: User;
  isCurrentUser: boolean;
}

const UserProfile = ({ user, isCurrentUser }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32">
        {/* 画像は未対応 */}
        <AvatarImage src="https://avatars.githubusercontent.com/u/33023225?v=4" />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        {isCurrentUser && (
          <Button variant="outline" size="sm">
            編集
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
