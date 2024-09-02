import { atom } from "recoil";

type Props = {
  rule: "ROLE_ADMIN" | "ROLE_MANAGER" | "ROLE_USER" |"ROLE_FRANCHISE"| "ROLE_ACCOUNTANT" | null;
  status: "success" | "failed" | "loading";
  accessToken?: any;
  refreshToken?: any;
  pkey?: number | string | null;
};

export let initialAppUserStatus: Props = {
  rule: null,
  status: "failed",
  accessToken: null,
  refreshToken: null,
  pkey: null,
};

// 사용자 상태관리
export const appUserStatusAtom = atom<Props>({
  key: "app-auth-atom",
  default: initialAppUserStatus,
});
