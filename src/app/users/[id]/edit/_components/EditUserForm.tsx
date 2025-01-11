"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateUser } from "../actions";

interface Props {
  user: User;
}

export const EditUserForm = ({ user }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateUser(user.id.toString(), formData);
        router.push(`/users/${user.id}`);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("更新に失敗しました");
        }
      }
    });
  };

  return (
    <form action={handleSubmit} className="max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">名前</Label>
        <Input id="name" name="name" defaultValue={user.name} required />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "更新中..." : "更新する"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
};
