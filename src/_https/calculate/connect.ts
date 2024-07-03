//
// 연결관리 데이터
export const getAllConects = async ({
  axiosInstance,
  page = 1,
}: AxiosType & { page: number }) => {
  try {
    const result = await axiosInstance.get(`/relation?page=${page}`);
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 엑셀 다운로드
export const downloadTableExcel = async ({ axiosInstance }: AxiosType) => {
  try {
    const response = await axiosInstance.get("/relation/excel", {
      responseType: "blob",
    });

    const filename = "미연결매장.xlsx";

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

// 연결필요
export const getConectList = async ({
  axiosInstance,
  gb,
}: AxiosType & { gb: any }) => {
  try {
    const result = await axiosInstance.get(`/relation/no?gb=${gb}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

//
// 연결필요 > 등록
export const updateConectList = async ({
  axiosInstance,
  request,
}: AxiosType & {
  request: { storeCode: string; scrapGb: string; relCode: string }[];
}) => {
  try {
    const result = await axiosInstance.post(`/relation/list`, request);
    return result.data;
  } catch (error) {
    throw error;
  }
};
