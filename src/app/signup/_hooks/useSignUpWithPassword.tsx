import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "./signUp.action";

export type SignUpParams = {
  email: string;
  password: string;
  username: string;
};

function makeSignUp(
  setErrorMessage: (errMessage: string) => void,
  resetErrorMessage: () => void,
  redirectLoginPage: () => void,
) {
  return async ({ email, password, username }: SignUpParams) => {
    resetErrorMessage();

    try {
      await signUp({ email, password, username });
      redirectLoginPage();
    } catch (error) {
      console.error(error);
      setErrorMessage("ユーザー登録に失敗しました。");
    }
  };
}
// TODO: useActionStateを使ってみる
export default function useSignUpWithPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setErrorMessage = (errMessage: string) => setError(errMessage);
  const resetErrorMessage = () => setError(null);
  const redirectLoginPage = () => router.push("/login");

  const signUp = makeSignUp(
    setErrorMessage,
    resetErrorMessage,
    redirectLoginPage,
  );

  return { signUp, error };
}
