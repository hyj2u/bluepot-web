import { useMoment } from "@/libs/hooks";

//
// 정산서 조회
export const getAllViews = async ({
  axiosInstance,
  date = useMoment("").previousMonth,
  search = "",
  page=1,
  activeYn = "Y", // 기본값 "Y" 추가
}: AxiosType & { date: any; search?: any; page?: any; activeYn?: string  }) => {
  try {
    const result = await axiosInstance.get(
      `/settle?settlementYmd=${date}&search=${search}&page=${page}&activeYn=${activeYn}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 조회 > 상태 업로드 (A004)
export const updateViewClosedActive = async ({
  axiosInstance,
  date,
}: AxiosType & { date: any }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/settle/fin?settlementYmd=${date + "-01"}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// 정산서 완료/미정산 처리
export const updateClosedYn = async ({
  axiosInstance,
  closedYn,
  pkey,
}: AxiosType & { closedYn: "N" | "Y"; pkey: any }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/settle/fin/${pkey}?closedYn=${closedYn === "N" ? "Y" : "N"}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 조회 > 상세
export const getDetailView = async ({
  axiosInstance,
  id,
}: AxiosType & { id: any }) => {
  try {
    const { data } = await axiosInstance.get(`/settle/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 조회 > 수정
export const updateDetailView = async ({
  axiosInstance,
  id,
  values,
}: AxiosType & { id: any; values: any }) => {
  try {
    const { data } = await axiosInstance.patch(`/settle/${id}`, values);
    return data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 신규등록 > 매장선택
export const getViewStoreOptions = async ({ axiosInstance }: AxiosType) => {
  try {
    const { data } = await axiosInstance.get(
      `/settle/store?settlementYmd=${useMoment("").previousMonth("yyyy-mm") + "-01"}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 신규등록
export const createDetailView = async ({
  axiosInstance,
  values,
}: AxiosType & { values: any }) => {
  try {
    const { data } = await axiosInstance.post(`/settle`, values);
    return data;
  } catch (error) {
    throw error;
  }
};
