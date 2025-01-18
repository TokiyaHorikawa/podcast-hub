import { findOrCreateUser } from "@/lib/services/user.service";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    if (!session) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const user = await findOrCreateUser(session.user);
    return NextResponse.json({ isAdmin: !!user?.isAdmin });
  } catch (error) {
    console.error("Error in check-admin route:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
