import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Content } from "@/lib/types";

const UserContents = ({ contents }: { contents: Content[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">投稿一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contents?.map((content: Content) => (
          <Card key={String(content.id)}>
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{content.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserContents;
