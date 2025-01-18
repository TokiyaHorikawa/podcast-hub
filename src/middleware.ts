import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
    return response;
  }

  // APIエンドポイントに対してはミドルウェアを実行しない
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // Supabaseのクッキーを設定する際にレスポンスを更新
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.delete({ name, ...options });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 管理画面へのアクセスをチェック
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("Middleware: Checking admin access");
    if (!session) {
      console.log("Middleware: No session found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Middleware: Session found, checking admin status");
    // セッションのユーザーIDを使って直接DBをチェック
    const adminCheckResponse = await fetch(
      new URL("/api/auth/check-admin", request.url),
      {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (!adminCheckResponse.ok) {
      console.log(
        "Middleware: Admin check failed with status:",
        adminCheckResponse.status,
      );
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { isAdmin } = await adminCheckResponse.json();
    console.log("Middleware: Admin check result:", { isAdmin });
    if (!isAdmin) {
      console.log("Middleware: User is not admin, redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
    console.log("Middleware: Admin access granted");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
