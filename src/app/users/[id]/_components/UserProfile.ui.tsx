import { Button } from "@/components/ui/button";
import AvatorUser from "@/features/users/AvatorUser";
import type { User } from "@/lib/types";

interface Props {
  user: User;
  isCurrentUser: boolean;
}

const UserProfile = ({ user, isCurrentUser }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <AvatorUser user={user} iconSize="lg" />
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
