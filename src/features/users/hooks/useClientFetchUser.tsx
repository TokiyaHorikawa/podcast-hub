"use client";

import { getUserFromClient } from "@/lib/supabase/getUserFromClient";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function useClientFetchUser() {
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
