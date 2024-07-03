//
import { useMoment } from "@/libs/hooks";
const prevMonthDate = useMoment("").previousMonth("yyyy-mm") + "-01";

//
// 정산자동화 > 전체 데이터
export const getAllAutos = async ({ axiosInstance }: AxiosType) => {
  try {
    const result = await axiosInstance.get(
      `/auto?settlementYmd=${prevMonthDate}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 한전 업로드
export const uploadKepcoExcel = async ({
  axiosInstance,
  file,
}: AxiosType & { file: any }) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const result = await axiosInstance.post(`/auto/kepco`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서반영
export const updateKepcoSetting = async ({ axiosInstance }: AxiosType) => {
  try {
    const result = await axiosInstance.post(
      `/auto?settlementYmd=${prevMonthDate}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
