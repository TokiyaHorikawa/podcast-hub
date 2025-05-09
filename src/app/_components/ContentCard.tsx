import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Database } from "@/types/database.types";
import { Heart } from "lucide-react";
import Link from "next/link";

type Content = Database["public"]["Tables"]["contents"]["Row"];

type ContentCardProps = {
  content: Content & {
    user: Database["public"]["Tables"]["users"]["Row"];
  };
};

const ContentCard = ({ content }: ContentCardProps) => {
  return (
    <Link href={`/contents/${content.id}`}>
      <Card className="h-full hover:bg-gray-50 transition-colors">
        <CardHeader className="pb-3">
          <h3 className="font-bold text-lg line-clamp-2 hover:text-blue-600">
            {content.title}
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  {content.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{content.user.name}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Heart className="h-4 w-4" />
              <span className="text-sm">0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
