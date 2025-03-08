"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser } from "../actions";

type Props = {
  user: User;
};

export default function EditUserForm({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await updateUser(user.id, {
        name: formData.get("name") as string,
      });
      router.push(`/users/${user.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating user:", error);
      // TODO: エラーハンドリングの実装
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">名前</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user.name}
          placeholder="名前を入力してください"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "更新中..." : "更新する"}
        </Button>
      </div>
    </form>
  );
}
