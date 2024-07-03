//
// 회원관리 > 목록
export const getAllUsers = async ({
  axiosInstance,
  search = "",
}: AxiosType & { search?: any }) => {
  try {
    const result = await axiosInstance.get(`/member?search=${search}`);
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 회원관리 > 상세
export const getUserDetail = async ({
  axiosInstance,
  id = "",
}: AxiosType & { id?: any }) => {
  try {
    const result = await axiosInstance.get(`/member/${id}`);
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 회원관리 > 등록/수정
export const createUser = async ({
  axiosInstance,
  userId = "",
  userPw = "",
  userName = "",
  email = "",
  phone = "",
  activeYn = "Y",
}: AxiosType & {
  userId?: any;
  userPw?: any;
  userName?: any;
  email?: any;
  phone?: any;
  activeYn?: "Y" | "N" | string;
}) => {
  try {
    const result = await axiosInstance.post(`/member`, {
      userId,
      userPw,
      userName,
      email,
      phone,
      activeYn,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

//
// 회원관리 > 등록/수정
export const updateUser = async ({
  axiosInstance,
  pkey = "",
  userPw = "",
  userName = "",
  email = "",
  phone = "",
  activeYn = "Y",
}: AxiosType & {
  pkey?: any;
  userPw?: any;
  userName?: any;
  email?: any;
  phone?: any;
  activeYn?: "Y" | "N" | string;
}) => {
  try {
    const result = await axiosInstance.put(`/member`, {
      pkey,
      userPw,
      userName,
      email,
      phone,
      activeYn,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
