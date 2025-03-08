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
  createServerSupabaseClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(),
    },
    from: jest.fn((table) => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      insert: jest.fn().mockReturnThis(),
    })),
  })),
}));

import { GET } from "./route";

describe("check-admin API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // consoleメソッドをモック化
    jest.spyOn(console, "error").mockImplementation(() => {});
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
    expect(response.status).toBe(500);
  });

  it("should return true for admin users", async () => {
    // 管理者ユーザーのセッションをモック
    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { isAdmin: true },
        error: null,
      }),
    });

    (createServerSupabaseClient as jest.Mock).mockReturnValue({
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: {
            session: {
              user: {
                id: "test-user-id",
                email: "admin@example.com",
              },
            },
          },
          error: null,
        }),
      },
      from: mockFrom,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: true });
    expect(mockFrom).toHaveBeenCalledWith("users");
    expect(mockFrom().select).toHaveBeenCalledWith("isAdmin");
    expect(mockFrom().eq).toHaveBeenCalledWith("uid", "test-user-id");
  });

  it("should create new user if not exists", async () => {
    // 新規ユーザーのセッションをモック
    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest
        .fn()
        .mockResolvedValueOnce({
          data: null,
          error: { code: "PGRST116" },
        })
        .mockResolvedValueOnce({
          data: { isAdmin: false },
          error: null,
        }),
      insert: jest.fn().mockReturnThis(),
    });

    (createServerSupabaseClient as jest.Mock).mockReturnValue({
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: {
            session: {
              user: {
                id: "new-user-id",
                email: "new@example.com",
              },
            },
          },
          error: null,
        }),
      },
      from: mockFrom,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(mockFrom).toHaveBeenCalledWith("users");
    expect(mockFrom().insert).toHaveBeenCalledWith({
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
    expect(response.status).toBe(500);
  });
});
