import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export interface Content {
  title: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
}

const Article = ({ content }: { content: Content }) => {
  return (
    <Card className="max-w-[750px] mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{content.title}</CardTitle>
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
      <CardContent className="pt-6">
        <div className="prose max-w-none">{content.body}</div>
      </CardContent>
    </Card>
  );
};

export default Article;
