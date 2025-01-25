import { prisma } from "@/lib/prisma";
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

// Prismaのモック
jest.mock("@/lib/prisma", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
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

    // Prismaの応答をモック
    (prisma.users.findUnique as jest.Mock).mockResolvedValue({
      isAdmin: true,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: true });
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { uid: "test-user-id" },
      select: { isAdmin: true },
    });
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
    (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
    // 新規ユーザー作成
    (prisma.users.create as jest.Mock).mockResolvedValue({
      isAdmin: false,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(prisma.users.create).toHaveBeenCalledWith({
      data: {
        uid: "new-user-id",
        email: "new@example.com",
        name: "new",
        isAdmin: false,
      },
      select: { isAdmin: true },
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
