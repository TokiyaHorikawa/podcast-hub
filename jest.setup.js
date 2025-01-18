require("@testing-library/jest-dom");

// Supabaseの環境変数のモック
process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:54321";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "dummy-anon-key";
