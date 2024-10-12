"use client";

import useSWR from "swr";
import { getUserFromClient } from "@/lib/supabase/utils/getUserFromClient";
import { useRouter } from "next/navigation";

export default function useUser() {
  const router = useRouter();
  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useSWR("/api/user", getUserFromClient);

  const isLoggedIn = !!user?.id;

  if (isLoggedIn) {
    router.push("/");
  }

  return { user, userError, isUserLoading };
}
