import React, { useEffect } from "react";

//atoms
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

export default function useAppVerifiy(
  rool?: "ROLE_ADMIN" | "ROLE_MANAGER" | "ROLE_USER"
) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);
  const router = useRouter();

  useEffect(() => {
    if (
      appUserStatus.rool === (rool ?? "ROLE_ADMIN") ||
      appUserStatus.rool === null
    )
      return;
    else router.back();
  }, [appUserStatus.rool]);
}
