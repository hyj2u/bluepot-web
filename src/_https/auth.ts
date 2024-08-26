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
//비밀번호 변경
export const updatePassword = async ({ 
  axiosInstance,
  newPassword = "",
}: AxiosType & {
  newPassword?: any;
}) => {
  try {
    const result = await axiosInstance.patch(`/auth/pw`, {
      newPassword,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
