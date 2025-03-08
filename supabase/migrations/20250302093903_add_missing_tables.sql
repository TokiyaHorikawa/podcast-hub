-- podcasts テーブルの作成
CREATE TABLE IF NOT EXISTS public.podcasts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "userId" INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- episodes テーブルの作成
CREATE TABLE IF NOT EXISTS public.episodes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "podcastId" INTEGER NOT NULL REFERENCES public.podcasts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- users テーブルに不足しているカラムを追加
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS uid UUID;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS "isAdmin" BOOLEAN DEFAULT false;

-- contents テーブルに不足しているカラムを追加
ALTER TABLE public.contents ADD COLUMN IF NOT EXISTS "userId" INTEGER REFERENCES public.users(id) ON DELETE CASCADE;
