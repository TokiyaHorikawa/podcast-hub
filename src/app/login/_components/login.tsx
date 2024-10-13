"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useUser from "../_hooks/useUser";
import useSignInWithPassword from "../_hooks/useSignInWithPassword";

export default function Login() {
  // TODO: Form Library使う？
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NOTE: ログインしているかどうかをチェック
  useUser();
  const { signInWithPassword, error } = useSignInWithPassword();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // NOTE: これは全体にデフォルトの設定にした方がいい？
    await signInWithPassword({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>アカウントにログインしてください</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              ログイン
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
