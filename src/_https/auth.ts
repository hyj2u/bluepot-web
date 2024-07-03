import { API } from "./apis";

// 로그인
export const createSignIn = async ({
  userId,
  userPw,
}: {
  userId: string;
  userPw: string;
}) => {
  try {
    const result = await API.post("/auth/login", { userId, userPw });
    return result.data;
  } catch (error) {
    throw error;
  }
};

// 유효성검사
export const getUserVerify = async ({ axiosInstance }: AxiosType) => {
  try {
    const result = await axiosInstance.get("/auth/valid");
    return result.data;
  } catch (error) {
    throw error;
  }
};
