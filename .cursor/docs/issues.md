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
- [ ] PrismaのMigrationが完全に停止され、SupabaseのMigrationに統一された
- [ ] SupabaseのMigrationでスキーマ管理が行えるようになった
- [ ] Prismaの型生成 (`prisma generate`) は継続して利用できる
- [ ] すべてのデータアクセスが `supabase-js` に移行された
- [ ] チームメンバーが新しいMigrationフローを理解し、適用できる状態になった

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
