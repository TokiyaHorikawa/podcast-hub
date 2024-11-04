import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase";
import { PrismaClient } from "@prisma/client";

type SignUpParams = {
  email: string;
  password: string;
  username: string;
};

// TODO: Prismaはサーバーサイドでしか実行できないので、server actions等を検討する

async function signUpAuth(
  email: SignUpParams["email"],
  password: SignUpParams["password"]
): Promise<{ userId: string | undefined }> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  return { userId: data?.user?.id };
}

async function createUser(
  userId: string,
  username: SignUpParams["username"],
  email: SignUpParams["email"]
): Promise<void> {
  const prisma: PrismaClient = new PrismaClient();
  try {
    await prisma.user.create({
      data: { uid: userId, name: username, email },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function makeSignUp(
  setErrorMessage: (errMessage: string) => void,
  resetErrorMessage: () => void,
  redirectLoginPage: () => void
) {
  return async ({ email, password, username }: SignUpParams) => {
    resetErrorMessage();

    try {
      const { userId } = await signUpAuth(email, password);
      if (userId) {
        await createUser(userId, username, email);
      } else {
        throw new Error("ユーザーIDが取得できませんでした。");
      }

      redirectLoginPage();
    } catch (error) {
      console.error(error);
      setErrorMessage("ユーザー登録に失敗しました。");
    }
  };
}

export default function useSignUpWithPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setErrorMessage = (errMessage: string) => setError(errMessage);
  const resetErrorMessage = () => setError(null);
  const redirectLoginPage = () => router.push("/login");

  const signUp = makeSignUp(
    setErrorMessage,
    resetErrorMessage,
    redirectLoginPage
  );

  return { signUp, error };
}
