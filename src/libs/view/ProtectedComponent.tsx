import React, { ReactNode } from "react";
import { LoadingSpinner, V } from "@/_ui";
import { useRecoilState } from "recoil";
import { appUserStatusAtom } from "../atoms/auth-atom";
import LoadingInfoBox from "../components/custom/LoadingInfoBox";

export function ProtectedComponent({ children }: { children: ReactNode }) {
  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);

  if (appStatus.status === "loading" || appStatus.status === "failed") {
    return;
  }

  if (appStatus.status === "success") return children;

  return null;
}
