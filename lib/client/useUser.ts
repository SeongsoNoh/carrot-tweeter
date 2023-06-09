import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/user/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/login");
    }
    if (data && data.ok && router.pathname === "/login") {
      router.replace("/profile");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
