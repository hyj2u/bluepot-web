import React, { ReactNode } from "react";
import { NextRouter, useRouter } from "next/router";
import { useTanstackQuery } from "../hooks/useTanstackQuery";
import { useCookie } from "../hooks/useCookie";
import { STATUS, TOKEN, getTokenCookieOptions } from "../utils/enum";
import { getUserVerify } from "@/_https/auth";

//atoms
import { useRecoilState } from "recoil";
import { appUserStatusAtom } from "../atoms/auth-atom";

//libs
import { LoadingSpinner, V } from "@/_ui";
import { Logo } from "../assets/icon-color";

// Types
type LayoutProps = {
  children: ReactNode;
};

export default function SessionComponent({
  children,
}: LayoutProps): JSX.Element {
  const router: NextRouter = useRouter();

  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);
  const { axiosInstance, queryKeys, useQuery, queryClient } =
    useTanstackQuery();
  const accessToken = useCookie.get(TOKEN.ACCESS);
  const refreshToken = useCookie.get(TOKEN.REFRESH);

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.verify, axiosInstance, accessToken, appStatus.status],
    queryFn: () => getUserVerify({ axiosInstance }),
    onSuccess: (data: any) => {
      setAppStatus({
        ...appStatus,
        rule: data?.auth,
        status: STATUS.SUCCESS,
        accessToken,
        refreshToken,
        pkey: data?.pkey,
      });
    },
    onError: () => {
      router.replace("/login");
      useCookie.remove(TOKEN.ACCESS, getTokenCookieOptions());
      useCookie.remove(TOKEN.REFRESH, getTokenCookieOptions());
      queryClient.clear;
      setAppStatus({
        rule: null,
        status: STATUS.FAILED,
        accessToken: null,
        refreshToken: null,
      });
    },
  });

  if (isLoading) return <></>;

  return <>{children}</>;
}
