import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { middleware } from "./middleware";

// Supabaseのモック
jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

// fetchのモック
global.fetch = jest.fn();

describe("Middleware", () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    // リクエストのモック
    mockRequest = new NextRequest(new URL("http://localhost:3000"), {
      headers: new Headers({
        cookie: "mock-cookie",
      }),
    });

    // Supabaseのモックの基本設定
    (createServerClient as jest.Mock).mockReturnValue({
      auth: {
        getSession: jest.fn(),
      },
    });
  });

  it("should allow access to non-admin routes without session", async () => {
    // セッションなしの場合
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    mockRequest = new NextRequest(new URL("http://localhost:3000/about"));
    const response = await middleware(mockRequest);

    expect(response.status).not.toBe(307); // リダイレクトされていないことを確認
  });

  it("should redirect to login for admin routes without session", async () => {
    // セッションなしの場合
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    mockRequest = new NextRequest(new URL("http://localhost:3000/admin"));
    const response = await middleware(mockRequest);

    expect(response.status).toBe(307); // Next.jsは307 Temporary Redirectを使用
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login",
    );
  });

  it("should allow access to admin routes for admin users", async () => {
    // 管理者セッションのモック
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "admin-user-id" },
        },
      },
    });

    // admin-checkのレスポンスをモック
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ isAdmin: true }),
    });

    mockRequest = new NextRequest(new URL("http://localhost:3000/admin"), {
      headers: new Headers({
        cookie: "mock-cookie",
      }),
    });
    const response = await middleware(mockRequest);

    expect(response.status).not.toBe(307); // リダイレクトされていないことを確認
    // fetchの呼び出しパラメータを正確に検証
    const [[url, options]] = (global.fetch as jest.Mock).mock.calls;
    expect(url.toString()).toBe("http://localhost:3000/api/auth/check-admin");
    expect(options).toEqual({
      headers: {
        Cookie: "mock-cookie",
      },
    });
  });

  it("should redirect non-admin users from admin routes", async () => {
    // 非管理者セッションのモック
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "non-admin-user-id" },
        },
      },
    });

    // admin-checkのレスポンスをモック
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ isAdmin: false }),
    });

    mockRequest = new NextRequest(new URL("http://localhost:3000/admin"));
    const response = await middleware(mockRequest);

    expect(response.status).toBe(307); // Next.jsは307 Temporary Redirectを使用
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("should skip middleware for API routes", async () => {
    mockRequest = new NextRequest(
      new URL("http://localhost:3000/api/some-endpoint"),
    );
    const response = await middleware(mockRequest);

    expect(createServerClient).not.toHaveBeenCalled();
    expect(response.status).not.toBe(307);
  });
});
