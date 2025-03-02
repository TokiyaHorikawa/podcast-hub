import { createServerSupabaseClient } from "@/lib/supabase/server";

// Next.jsのcookiesをモック
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Supabaseのモック
jest.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: jest.fn(),
}));

import { GET } from "./route";

describe("check-admin API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // consoleメソッドをモック化
    jest.spyOn(console, "error").mockImplementation(() => {});

    // Supabaseのモックの基本設定
    (createServerSupabaseClient as jest.Mock).mockReturnValue({
      auth: {
        getSession: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      insert: jest.fn().mockReturnThis(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return false when no session exists", async () => {
    // Supabaseセッションがない場合のモック
    (
      createServerSupabaseClient as jest.Mock
    )().auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(response.status).toBe(401);
  });

  it("should return true for admin users", async () => {
    // 管理者ユーザーのセッションをモック
    (
      createServerSupabaseClient as jest.Mock
    )().auth.getSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: "test-user-id",
            email: "admin@example.com",
          },
        },
      },
      error: null,
    });

    // Supabaseの応答をモック
    (createServerSupabaseClient as jest.Mock)()
      .from()
      .select()
      .eq()
      .single.mockResolvedValue({
        data: { isAdmin: true },
        error: null,
      });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: true });
    expect(createServerSupabaseClient().from).toHaveBeenCalledWith("users");
    expect(createServerSupabaseClient().select).toHaveBeenCalledWith("isAdmin");
    expect(createServerSupabaseClient().eq).toHaveBeenCalledWith(
      "uid",
      "test-user-id",
    );
  });

  it("should create new user if not exists", async () => {
    // 新規ユーザーのセッションをモック
    (
      createServerSupabaseClient as jest.Mock
    )().auth.getSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: "new-user-id",
            email: "new@example.com",
          },
        },
      },
      error: null,
    });

    // ユーザーが存在しない場合
    (createServerSupabaseClient as jest.Mock)()
      .from()
      .select()
      .eq()
      .single.mockResolvedValue({
        data: null,
        error: { code: "PGRST116" },
      });

    // 新規ユーザー作成
    (createServerSupabaseClient as jest.Mock)()
      .from()
      .insert()
      .select()
      .single.mockResolvedValue({
        data: { isAdmin: false },
        error: null,
      });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(createServerSupabaseClient().from).toHaveBeenCalledWith("users");
    expect(createServerSupabaseClient().insert).toHaveBeenCalledWith({
      uid: "new-user-id",
      email: "new@example.com",
      name: "new",
      isAdmin: false,
    });
  });

  it("should handle Supabase errors", async () => {
    // Supabaseエラーをモック
    (
      createServerSupabaseClient as jest.Mock
    )().auth.getSession.mockResolvedValue({
      data: { session: null },
      error: new Error("Supabase error"),
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(response.status).toBe(401);
  });
});
