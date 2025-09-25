export const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
} as const;

export const TOKEN = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
} as const;

export const getTokenCookieOptions = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      domain: ".cncocompany.com",
    };
  }
  // 개발 환경에서는 도메인을 설정하지 않음 (localhost에서 사용)
  return {};
};