import Header from "@/components/Header";
import ContentCard from "@/app/contents/_components/ContentCard";

const ContentDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <ContentCard id={params.id} />
        </main>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  // 動的なパラメータを生成するロジックをここに実装
  return [{ id: "1" }, { id: "2" }]; // 例：id 1と2のページを生成
}

export default ContentDetail;
