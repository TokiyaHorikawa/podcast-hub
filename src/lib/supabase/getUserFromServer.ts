import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const prisma = new PrismaClient();

// server componentを想定している
export async function getUserFromServer() {
  const cookieStore = cookies();

  // デバッグ用：すべてのcookieを確認
  console.log('All cookies:', cookieStore.getAll());

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get(name) {
          const value = cookieStore.get(name)?.value;
          console.log(`Cookie get: ${name} = ${value}`);
          return value;
        },
        set(name, value, options) {
          try {
            console.log(`Cookie set: ${name}`);
            cookieStore.set(name, value, options)
          } catch {
            console.log(`Cookie set failed: ${name}`);
            // Server component での set は無視
          }
        },
        remove(name, options) {
          try {
            console.log(`Cookie remove: ${name}`);
            cookieStore.set(name, '', options)
          } catch {
            console.log(`Cookie remove failed: ${name}`);
            // Server component での remove は無視
          }
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  console.log('Session:', session);

  if (!session?.user) {
    console.log('No session or user found');
    return null
  }

  // TODO: UIDでuserを取得できるようにしたい
  const dbUser = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  console.log('DB User:', dbUser);
  return dbUser;
}
