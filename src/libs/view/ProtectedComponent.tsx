import React, { ReactNode, useEffect } from "react";
import { LoadingSpinner, V } from "@/_ui";
import { useRecoilState } from "recoil";
import { appUserStatusAtom } from "../atoms/auth-atom";

export function ProtectedComponent({ children }: { children: ReactNode }) {
  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);

  if (appStatus.status === "loading" || appStatus.status === "failed") {
    return (
      <V.Container align="center" padding={{ all: 30 }}>
        <LoadingSpinner />
      </V.Container>
    );
  }

  if (appStatus.status === "success") return children;

  return null;
}
