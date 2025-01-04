import { CardHeader } from "@/components/ui/card";
import AvatorUser from "@/features/users/AvatorUser";

const mockUser = {
  id: 1,
  name: "ユーザー名",
  uid: "user1",
  email: "user1@example.com",
  createdAt: new Date(),
};

const ContentHeader = () => {
  const user = mockUser;
  return (
    <CardHeader>
      <div className="flex items-center space-x-2">
        <AvatorUser user={user} iconSize="sm" />
        <p>{user.name}</p>
      </div>
    </CardHeader>
  );
};

export default ContentHeader;
