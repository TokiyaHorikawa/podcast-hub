現在取り組んでいるissueの内容です。

---

# issue

- Number: #85
- Title: PrismaのMigrationをやめて、Supabaseに統一する

### **Issue: PrismaのMigrationをやめて、Supabaseに統一する**

#### **概要**
現在、PrismaのMigration (`prisma migrate`) を使用してデータベースの管理を行っているが、以下の問題が発生している：
- **RLS（Row Level Security）をPrismaのMigrationでは管理できない**
- **PrismaのMigrationとSupabaseのMigrationが二重管理になっている**
- **Supabaseのネイティブ機能（Auth, Functions, Edge Functions）と統合しづらい**

そのため、**今後のMigrationはSupabaseのMigrationに統一し、Prismaは型生成専用として利用する** 形に移行する。

---

## ✅ **タスク一覧**
### **1. 既存のMigrationをSupabaseに移行**
- Prismaのスキーマを確認し、Supabase側に適用
- SupabaseのMigrationファイルを作成
- 既存のデータを保持したまま移行可能か検討

### **2. PrismaのMigrationを停止**
- `prisma migrate` の実行を停止し、Migrationの適用元をSupabaseに変更

### **3. Prismaの型生成機能を継続**
- `prisma db pull` を使用して、SupabaseのDBスキーマをPrismaに反映
- `prisma generate` で型を生成し、型安全性を維持

### **4. SupabaseのMigration運用フローを確立**
- `supabase migration new` コマンドを使ったMigration作成フローをチームに周知
- Supabase Studioでのスキーマ変更を避け、Migrationファイルを管理する方針を決める

### **5. Prisma Clientの使用範囲を整理**
- PrismaのORMとしての使用をやめ、型参照のみにする
- データ操作は `@supabase/supabase-js` に統一する

---

## ✅ **詳細な移行手順**
### **ステップ 1: 現在のDBスキーマを確認**
まず、現在のPrismaのスキーマ (`schema.prisma`) を確認し、Supabaseのスキーマと比較する。

```sh
cat prisma/schema.prisma
```

また、SupabaseのDBスキーマをダンプしておく。

```sh
supabase db dump
```

---

### **ステップ 2: PrismaのMigrationを停止**
今後PrismaのMigrationは使用しないため、`prisma migrate` を削除する。

```sh
rm -rf prisma/migrations
```

また、`prisma/schema.prisma` の `@@map()` や `@@id()` などのPrisma特有の設定を見直し、Supabase側の制約と整合性を取る。

---

### **ステップ 3: SupabaseのMigrationを適用**
1. SupabaseのMigrationを作成（例: `users` テーブルの追加）
   ```sh
   supabase migration new add_users_table
   ```

2. `supabase/migrations/` に生成されたSQLファイルを編集し、Prismaで作成していたテーブルと同じ定義を記述する。
   ```sql
   CREATE TABLE public.users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name TEXT NOT NULL,
       email TEXT UNIQUE NOT NULL,
       created_at TIMESTAMP DEFAULT now()
   );
   ```

3. Migrationを適用
   ```sh
   supabase db push
   ```

4. RLSの設定を追加（必要に応じて）
   ```sql
   ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Enable read access for authenticated users"
   ON public.users
   FOR SELECT
   USING (auth.uid() = id);
   ```

---

### **ステップ 4: Prismaの型生成機能を利用**
PrismaのMigrationはやめるが、型生成のために `prisma introspect` を使う。

```sh
npx prisma db pull
npx prisma generate
```

この方法で、PrismaのORMを使わずに、Supabaseのスキーマを型安全に扱うことができる。

---

### **ステップ 5: データアクセスをSupabaseに統一**
今後は、データ操作を `supabase-js` に統一する。

#### **Prisma使用時（旧）**
```ts
const user = await prisma.user.findUnique({
  where: { id: userId }
});
```

#### **Supabaseに移行後（新）**
```ts
const { data: user, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();
```

---

## ✅ **実装計画（詳細）**

### **1. package.jsonのスクリプト更新**
現在のスクリプトを以下のように更新する：

```json
{
  "scripts": {
    "db:reset": "supabase db reset && npx prisma db pull && npx prisma generate && npm run db:seed",
    "db:seed": "ts-node prisma/seed.ts",
    "db:pull": "prisma db pull",
    "db:generate": "prisma generate",
    "db:migration:new": "supabase migration new",
    "db:migration:push": "supabase db push",
    "db:migrate": "echo 'This command is deprecated. Use db:migration:push instead.'",
    "db:migrate:dev": "echo 'This command is deprecated. Use db:migration:new and db:migration:push instead.'",
    "db:new": "echo 'This command is deprecated. Use db:migration:new instead.'",
    "db:status": "supabase migration list",
    "db:studio": "prisma studio"
  }
}
```

### **2. Prismaスキーマの更新**
`schema.prisma`ファイルを更新して、型生成のみに使用するように変更する：

```prisma
// このスキーマファイルは型生成のみに使用します。
// マイグレーションはSupabaseで管理します。

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 以下のモデル定義はSupabaseのスキーマと同期するために使用します
// モデルの変更はSupabaseのマイグレーションで行い、その後 prisma db pull で反映します
```

### **3. シードスクリプトの更新**
`prisma/seed.ts`を更新して、Prismaの代わりにSupabaseクライアントを使用するように変更する。

### **4. アプリケーションコードの更新**
以下のファイルを中心に、Prismaクライアントの使用箇所をSupabaseクライアントに置き換える：

- `src/lib/services/user.service.ts`
- `src/app/contents/new/createPost.ts`

### **5. 移行テスト**
1. 開発環境でDBをリセットして、新しい方式でマイグレーションとシードが正常に動作するか確認
2. アプリケーションの各機能が正常に動作するか確認

### **6. ドキュメント更新**
開発者向けのドキュメントを更新して、新しいDB管理方法を説明する。

---

## ✅ **運用方針**
1. **MigrationはSupabaseのみを利用**
   - PrismaのMigration (`prisma migrate dev`) は今後使用しない
   - `supabase migration` でDBスキーマの変更を行う
   - RLSやAuthはSupabase側で管理

2. **型はPrismaを利用**
   - `prisma db pull` で最新のスキーマを取得
   - `prisma generate` で型を生成
   - ORMは使用せず、型のみを活用

3. **データアクセスはSupabaseに統一**
   - APIやバックエンドでは `supabase-js` を使う
   - Prisma Clientは型のための参照のみ

---

## ✅ **完了の定義 (Definition of Done)**
- [x] PrismaのMigrationが完全に停止され、SupabaseのMigrationに統一された
- [x] SupabaseのMigrationでスキーマ管理が行えるようになった
- [x] Prismaの型生成 (`prisma generate`) は継続して利用できる
- [x] 主要なデータアクセスが `supabase-js` に移行された
- [ ] すべてのデータアクセスが `supabase-js` に移行された
- [ ] チームメンバーが新しいMigrationフローを理解し、適用できる状態になった

---

## ✅ **実装結果**

### **1. package.jsonのスクリプト更新**
以下のようにスクリプトを更新しました：

```json
{
  "scripts": {
    "db:reset": "supabase db reset && npx prisma db pull && npx prisma generate && npm run db:seed",
    "db:seed": "ts-node prisma/seed.ts",
    "db:pull": "prisma db pull",
    "db:generate": "prisma generate",
    "db:migration:new": "supabase migration new",
    "db:migration:push": "supabase db push",
    "db:migrate": "echo 'This command is deprecated. Use db:migration:push instead.'",
    "db:migrate:dev": "echo 'This command is deprecated. Use db:migration:new and db:migration:push instead.'",
    "db:new": "echo 'This command is deprecated. Use db:migration:new instead.'",
    "db:status": "supabase migration list",
    "db:studio": "prisma studio"
  }
}
```

### **2. Prismaスキーマの更新**
`schema.prisma`ファイルを更新して、型生成のみに使用するように変更しました：

```prisma
// このスキーマファイルは型生成のみに使用します。
// マイグレーションはSupabaseで管理します。

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 以下のモデル定義はSupabaseのスキーマと同期するために使用します
// モデルの変更はSupabaseのマイグレーションで行い、その後 prisma db pull で反映します
```

### **3. シードスクリプトの更新**
`prisma/seed.ts`を更新して、Prismaの代わりにSupabaseクライアントを使用するように変更しました。

### **4. アプリケーションコードの更新**
以下のファイルを更新して、Prismaの代わりにSupabaseクライアントを使用するように変更しました：

- `src/lib/services/user.service.ts`
- `src/app/contents/new/createPost.ts`

### **5. 今後の作業**
- 残りのPrismaクライアント使用箇所をSupabaseクライアントに置き換える
- チームメンバーに新しいDB管理方法を説明するドキュメントを作成する

---

## ✅ **新しいDB管理フロー**

### **1. スキーマ変更の流れ**
1. Supabaseのマイグレーションファイルを作成
   ```sh
   npm run db:migration:new <migration_name>
   ```

2. 生成されたSQLファイルを編集

3. マイグレーションを適用
   ```sh
   npm run db:migration:push
   ```

4. Prismaの型を更新
   ```sh
   npm run db:pull
   npm run db:generate
   ```

### **2. 開発環境のリセット**
```sh
npm run db:reset
```

### **3. 型の利用方法**
Prismaで生成された型は引き続き使用できます：

```ts
import type { Users, Contents } from "@prisma/client";
```

---

## ✅ **注意点**
- Prismaクライアントは型参照のみに使用し、データアクセスには使用しないでください
- スキーマ変更は必ずSupabaseのマイグレーションで行ってください
- Supabase Studioでの直接的なスキーマ変更は避け、必ずマイグレーションファイルを作成してください
- RLSの設定はSupabaseのマイグレーションファイルに記述してください

---

## ✅ **影響範囲**
- PrismaのMigrationを削除するため、**一度DBをリセットしないと適用できない可能性あり**
- Prismaの型を維持するために、`prisma db pull` を継続的に実行する必要あり
- `prisma` を完全に削除するのではなく、**型定義のために一部利用を続ける**

---

## ✅ **補足**
- **もしPrismaの完全削除を目指す場合**:
  - `Zod` などを使って型を定義することで、Prismaなしでも型安全にできる
  - `@supabase/postgrest-js` などのライブラリを使い、型生成の仕組みを組み込む
  - ただし、現時点では `prisma generate` の型生成が便利なので、すぐに削除する必要はない

---

## ✅ **最終的な結論**
- **PrismaのMigrationを完全に停止し、SupabaseのMigrationに一本化**
- **Prismaは型生成専用に活用し、データアクセスはSupabaseに統一**
- **今後のDB管理は `supabase migration` に統一する**

---

これで、**Migrationの二重管理を解消しつつ、Prismaの型安全性を維持することができる** 形になると思います！
