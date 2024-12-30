import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader } from "@/components/ui/card";

const ContentHeader = () => {
  return (
    <CardHeader>
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            className="h-8 w-8"
            src="https://avatars.githubusercontent.com/u/33023225?v=4"
          />
          <AvatarFallback className="h-8 w-8">SH</AvatarFallback>
        </Avatar>
        <p>ユーザー名</p>
      </div>
    </CardHeader>
  );
};

export default ContentHeader;
