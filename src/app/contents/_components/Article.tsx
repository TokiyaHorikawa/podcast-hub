import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LikeButton from "./LikeButton";
import Link from "next/link";

export interface Content {
  title: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  type: "showNote" | "annotation" | "review";
  podcastEpisode: PodcastEpisode;
}

interface PodcastEpisode {
  title: string;
  id: string;
}

const getContentTypeLabel = (type: Content["type"]) => {
  switch (type) {
    case "showNote":
      return "まとめ・文字起こし";
    case "annotation":
      return "補足・資料";
    case "review":
      return "感想・レビュー";
    default:
      return "";
  }
};

const Article = ({ content }: { content: Content }) => {
  const typeLabel = getContentTypeLabel(content.type);

  return (
    <Card className="max-w-[750px] mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold">{content.title}</CardTitle>
          <Badge variant="secondary">{typeLabel}</Badge>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Avatar>
            <AvatarImage src={content.author.image} alt={content.author.name} />
            <AvatarFallback>{content.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{content.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {content.publishedAt}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <div className="px-6 py-4 bg-muted">
        <p className="text-sm font-medium mb-1">引用元Podcastエピソード：</p>
        <Link
          href={`/episodes/${content.podcastEpisode.id}`}
          className="text-primary hover:underline"
        >
          {content.podcastEpisode.title}
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
