#!/bin/bash

# エラーが発生したら即座に終了
set -e

echo "🔄 ローカルDBとauthをリセットします..."

# Supabaseのローカルサービスが起動していることを確認
if ! docker ps | grep -q "supabase_db_podcast-hub"; then
  echo "❌ Supabaseのローカルサービスが起動していません。"
  echo "💡 以下のコマンドを実行してください："
  echo "   supabase start"
  exit 1
fi

# Prismaのマイグレーションをリセット
echo "🗑️  Prismaのマイグレーションをリセットしています..."
npx prisma migrate reset --force

# Supabaseのauthをリセット
echo "🗑️  Supabaseのauthをリセットしています..."
docker exec supabase_db_podcast-hub psql -U postgres -c "TRUNCATE auth.users CASCADE;"

# シードデータを投入
echo "🌱 シードデータを投入しています..."
npx ts-node prisma/seed.ts

echo "✨ 完了！以下のユーザーでログインできます："
echo "📧 管理者: admin@example.com / admin123"
echo "📧 一般ユーザー1: yamada@example.com / password123"
echo "📧 一般ユーザー2: sato@example.com / password123"
