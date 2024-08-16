import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="bg-card rounded-lg shadow p-4">
            {/* ここにタイムラインのコンテンツを追加 */}
            <h2 className="text-xl font-semibold mb-4">タイムライン</h2>
            {/* タイムラインの項目をここに追加 */}
          </div>
        </main>
      </div>
    </div>
  );
}
