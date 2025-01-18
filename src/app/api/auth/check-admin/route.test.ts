import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { GET } from "./route";

// Next.jsのcookiesをモック
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Supabaseのモック
jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

// Prismaのモック
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("check-admin API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // consoleメソッドをモック化
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});

    // Supabaseのモックの基本設定
    (createServerClient as jest.Mock).mockReturnValue({
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
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
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
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
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
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      isAdmin: true,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: true });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { uid: "test-user-id" },
      select: { isAdmin: true },
    });
  });

  it("should create new user if not exists", async () => {
    // 新規ユーザーのセッションをモック
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
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
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    // 新規ユーザー作成
    (prisma.user.create as jest.Mock).mockResolvedValue({
      isAdmin: false,
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(prisma.user.create).toHaveBeenCalledWith({
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
    (createServerClient as jest.Mock)().auth.getSession.mockResolvedValue({
      data: { session: null },
      error: new Error("Supabase error"),
    });

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ isAdmin: false });
    expect(response.status).toBe(401);
  });
});
