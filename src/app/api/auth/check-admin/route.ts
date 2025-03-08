import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }

    if (!session) {
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("isAdmin")
      .eq("uid", session.user.id)
      .single();

    if (userError) {
      if (userError.code === "PGRST116") {
        // ユーザーが存在しない場合は新規作成
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert({
            uid: session.user.id,
            email: session.user.email,
            name: session.user.email?.split("@")[0] || "new",
            isAdmin: false,
          })
          .select()
          .single();

        if (createError) {
          console.error("Error creating user:", createError);
          return NextResponse.json({ isAdmin: false }, { status: 500 });
        }

        return NextResponse.json({ isAdmin: false });
      }

      console.error("Error fetching user:", userError);
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }

    return NextResponse.json({ isAdmin: !!user?.isAdmin });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
