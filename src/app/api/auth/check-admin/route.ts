import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Starting check-admin route handler");

    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string) {
          // APIルートでは新しいクッキーを設定する必要はない
        },
        remove(name: string) {
          // APIルートでは既存のクッキーを削除する必要はない
        },
      },
    });

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    console.log(
      "Session data:",
      session?.user?.id ? { userId: session.user.id } : null,
    );

    if (!session) {
      console.log("No session found");
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    console.log("User ID:", session.user.id);

    let user = await prisma.user.findUnique({
      where: { uid: session.user.id },
      select: { isAdmin: true },
    });

    if (!user) {
      console.log("User record not found, creating new user");
      user = await prisma.user.create({
        data: {
          uid: session.user.id,
          email: session.user.email || "",
          name: session.user.email?.split("@")[0] || "Unknown",
          isAdmin: false,
        },
        select: { isAdmin: true },
      });
    }

    console.log("User data from DB:", {
      userId: session.user.id,
      email: session.user.email,
      userRecord: user,
    });

    return NextResponse.json({ isAdmin: !!user?.isAdmin });
  } catch (error) {
    console.error("Error in check-admin route:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
