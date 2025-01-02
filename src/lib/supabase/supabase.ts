import { createBrowserClient } from "@supabase/ssr";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Database = {};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable",
  );
}

// URLの形式を検証
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    `Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}. Must be a valid URL.`,
  );
}

const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export default supabase;
