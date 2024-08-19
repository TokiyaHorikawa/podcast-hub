import Header from "@/components/Header";
import Content from "@/features/contents/components/Content";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex flex-1">
      <main className="flex-1 p-6">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="bg-card rounded-lg shadow p-4">
            {Array.from({ length: 10 }, (_, index) => (
              <div className="mb-4" key={index}>
                <Content />
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
