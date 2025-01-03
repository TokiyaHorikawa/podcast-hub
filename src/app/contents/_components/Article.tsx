import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Author, Content, Episode } from "@/lib/types";
import Link from "next/link";
import LikeButton from "./LikeButton";

const Article = ({
  content,
  author,
  episode,
}: {
  content: Content;
  author: Author;
  episode: Episode;
}) => {
  return (
    <Card className="max-w-[750px] mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold">{content.title}</CardTitle>
          <Badge variant="secondary">まとめ</Badge>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Avatar>
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">2024-01-01</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <div className="px-6 py-4 bg-muted">
        <p className="text-sm font-medium mb-1">引用元Podcastエピソード：</p>
        <Link
          href={`/episodes/${episode.id}`}
          className="text-primary hover:underline"
        >
          {episode.title}
        </Link>
      </div>
      <Separator />
      <CardContent className="pt-6">
        <div className="prose max-w-none">{content.body}</div>
        <div className="mt-6 flex items-center">
          <LikeButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default Article;
