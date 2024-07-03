import { useMoment } from "@/libs/hooks";

//
// 정산서 작성 > 데이터
export const getAllEditTables = async ({
  axiosInstance,
  search,
}: AxiosType & { search: any }) => {
  try {
    const result = await axiosInstance.get(
      `/settle/write?settlementYmd=${useMoment("").previousMonth("yyyy-mm") + "-01"}&search=${search}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 열 조회
export const getColumnFilters = async ({
  axiosInstance,
  defaultYn,
}: AxiosType & { defaultYn?: "N" | "" }) => {
  try {
    const result = await axiosInstance.get(
      `/settle/field?defaultYn=${defaultYn ?? ""}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 일괄입력 > 옵션
export const getCategories = async ({ axiosInstance }: AxiosType) => {
  try {
    const result = await axiosInstance.get(`/settle/field`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 일괄입력 > 업데이트
export const updateEditTable = async ({
  axiosInstance,
  values,
}: AxiosType & { values: any }) => {
  try {
    const result = await axiosInstance.patch(`/settle`, values);
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 다운로드
export const downloadEditExcel = async ({ axiosInstance }: AxiosType) => {
  try {
    const response = await axiosInstance.get(
      `/settle/down?settlementYmd=${useMoment("").previousMonth("yyyy-mm") + "-01"}`,
      {
        responseType: "blob",
      }
    );

    const filename =
      "정산서_" + useMoment("").previousMonth("yyyy년mm월") + ".xlsx";

    // Blob을 이용해 다운로드 링크 생성
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a") as any;
    link.href = url;
    link.setAttribute("download", filename); // 다운로드 파일명 설정
    document.body.appendChild(link);
    link.click();

    // 생성된 링크 제거
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url); // URL 객체 해제
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};

//
// 정산서 업로드
export const uploadEditFile = async ({
  axiosInstance,
  file,
}: AxiosType & { file: any }) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const result = await axiosInstance.post(
      `/settle/up?settlementYmd=${useMoment("").previousMonth("yyyy-mm") + "-01"}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
