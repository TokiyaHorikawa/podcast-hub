import Article from "@/app/contents/_components/Article";

const ContentDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[750px] mx-auto">
      <Article />
    </div>
  );
};

export async function generateStaticParams() {
  // 動的なパラメータを生成するロジックをここに実装
  return [{ id: "1" }, { id: "2" }]; // 例：id 1と2のページを生成
}

export default ContentDetail;
