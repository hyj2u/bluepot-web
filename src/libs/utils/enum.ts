export const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
} as const;

export const TOKEN = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
} as const;

export const getTokenCookieOptions = () => ({
  domain: process.env.NEXT_PUBLIC_ENV === "production" ? ".cncocompany.com" : ".localhost",
});