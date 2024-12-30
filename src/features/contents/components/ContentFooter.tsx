import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

const ContentFooter = () => {
  return (
    <CardFooter className="flex justify-start items-center">
      <Button size="sm">いいね</Button>
      <span className="ml-2">0</span> {/* いいねの数を表示 */}
    </CardFooter>
  );
};

export default ContentFooter;
