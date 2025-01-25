import { prisma } from "@/lib/prisma";
import ContentCard from "./_components/ContentCard";

async function getContents() {
  const contents = await prisma.contents.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return contents || [];
}

export default async function Home() {
  const contents = await getContents();

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contents.map((content) => (
          <ContentCard key={content.id.toString()} content={content} />
        ))}
      </div>
    </main>
  );
}
