import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/types";
import Link from "next/link";

interface Props {
  user: User;
  iconSize?: "sm" | "md" | "lg";
}

// const demoImageUrl = "https://avatars.githubusercontent.com/u/33023225?v=4";

const sizeMap = {
  sm: "w-8 h-8",
  md: undefined,
  lg: "w-32 h-32",
};

const AvatorUser = ({ user, iconSize = "md" }: Props) => {
  const size = sizeMap[iconSize];
  return (
    <Link href={`/users/${user.id}`}>
      <Avatar className={size}>
        {/* TODO: 画像対応後に実装する */}
        {/* <AvatarImage src={demoImageUrl} /> */}
        <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default AvatorUser;
