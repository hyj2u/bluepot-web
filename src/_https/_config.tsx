import { useEffect } from "react";
import { STATUS, TOKEN, getTokenCookieOptions } from "@/libs/utils/enum";
import { useCookie } from "@/libs/hooks/useCookie";
import { API } from "./apis";
import {
  appUserStatusAtom,
  initialAppUserStatus,
} from "@/libs/atoms/auth-atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export function useAxios() {
  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);
  const accessToken = useCookie.get(TOKEN.ACCESS);
  const router = useRouter();
  
  console.log("useAxios - accessToken:", accessToken);

  useEffect(() => {
    const requestIntercept = API.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          useCookie.remove(TOKEN.ACCESS, getTokenCookieOptions());
          useCookie.remove(TOKEN.REFRESH, getTokenCookieOptions());
          setAppStatus(initialAppUserStatus);
          router.push("/login");

          return Promise.reject(error); // 로그인 페이지로 리디렉션 후, 에러를 반환합니다.
        }
        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.request.eject(requestIntercept);
      API.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, appStatus, router]);

  return API;
}
