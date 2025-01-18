import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type SupabaseCookieOptions = {
  get(name: string): string | undefined;
  set(name: string, value: string, options: CookieOptions): void;
  remove(name: string, options: CookieOptions): void;
};

const createSupabaseClient = (
  request: NextRequest,
  response: NextResponse,
  supabaseUrl: string,
  supabaseKey: string,
) => {
  const cookieOptions: SupabaseCookieOptions = {
    get(name: string) {
      return request.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      response.cookies.set({ name, value, ...options });
    },
    remove(name: string, options: CookieOptions) {
      response.cookies.delete({ name, ...options });
    },
  };

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: cookieOptions,
  });
};

const createInitialResponse = (request: NextRequest): NextResponse => {
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
};

const checkEnvironmentVariables = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
    return null;
  }

  return { supabaseUrl, supabaseKey };
};

const isApiRoute = (pathname: string): boolean => {
  return pathname.startsWith("/api/");
};

const isAdminRoute = (pathname: string): boolean => {
  return pathname.startsWith("/admin");
};

const checkAdminAccess = async (request: NextRequest) => {
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
    return false;
  }

  const { isAdmin } = await adminCheckResponse.json();
  console.log("Middleware: Admin check result:", { isAdmin });
  return isAdmin;
};

export async function middleware(request: NextRequest) {
  // 環境変数のチェック
  const env = checkEnvironmentVariables();
  if (!env) {
    return createInitialResponse(request);
  }

  // APIルートのスキップ
  if (isApiRoute(request.nextUrl.pathname)) {
    return createInitialResponse(request);
  }

  // レスポンスの初期化
  const response = createInitialResponse(request);

  // Supabaseクライアントの初期化
  const supabase = createSupabaseClient(
    request,
    response,
    env.supabaseUrl,
    env.supabaseKey,
  );

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 管理者ルートのアクセス制御
  if (isAdminRoute(request.nextUrl.pathname)) {
    console.log("Middleware: Checking admin access");

    if (!session) {
      console.log("Middleware: No session found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAdmin = await checkAdminAccess(request);
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
