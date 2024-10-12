"use client";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/utils/supabase";
import { useState } from "react";

export default function useSignInWithPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const signInWithPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
      return { error };
    }
  };

  return { signInWithPassword, error };
}
