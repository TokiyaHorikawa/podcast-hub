import { prisma } from "@/lib/prisma";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  if (!session) {
    return NextResponse.json({ isAdmin: false });
  }

  const user = await prisma.user.findUnique({
    where: { uid: session.user.id },
    select: { isAdmin: true },
  });

  return NextResponse.json({ isAdmin: !!user?.isAdmin });
}
