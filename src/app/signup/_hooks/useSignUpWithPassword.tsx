import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

type SignUpParams = {
  email: string;
  password: string;
  username: string;
};

export default function useSignUpWithPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const signUp = async ({ email, password, username }: SignUpParams) => {
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // ユーザーのUIDを取得
      const userId = data.user?.id;

      if (userId) {
        // usersテーブルにユーザー名を保存
        try {
          await prisma.user.create({
            data: { uid: userId, name: username, email },
          });
        } catch (prismaError) {
          throw prismaError;
        }
      }

      // ユーザー登録が成功したらログインページにリダイレクト
      router.push("/login");
    } catch (error) {
      setError("ユーザー登録に失敗しました。");
    }
  };

  return { signUp, error };
}
