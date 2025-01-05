import { Button } from "@/components/ui/button";
import AvatorUser from "@/features/users/AvatorUser";
import type { User } from "@/lib/types";
import Link from "next/link";

interface AuthenticatedHeaderProps {
  user: User;
}

const AuthenticatedHeader = ({ user }: AuthenticatedHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/contents/new">
        <Button variant="default">投稿する</Button>
      </Link>
      <AvatorUser user={user} />
    </div>
  );
};

export default AuthenticatedHeader;
