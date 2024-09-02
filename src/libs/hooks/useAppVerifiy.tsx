import React, { useEffect } from "react";

//atoms
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

export default function useAppVerifiy(
  rule?: "ROLE_ADMIN" | "ROLE_MANAGER" | "ROLE_USER" |"ROLE_FRANCHISE" | "ROLE_ACCOUNTANT"
) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);
  const router = useRouter();

  useEffect(() => {
    if (
      appUserStatus.rule === (rule ?? "ROLE_ADMIN") ||
      appUserStatus.rule === null
    )
      return;
    else router.back();
  }, [appUserStatus.rule]);
}
