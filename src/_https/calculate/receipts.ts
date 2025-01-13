//
// 입금/세금계산서 총괄표
export const getAllReceipts = async ({
  axiosInstance,
  date,
  activeYn = "Y", // 기본값 "Y" 추가
}: AxiosType & { date: any; activeYn?: string }) => {
  try {
    const { data } = await axiosInstance.get(
      `/sum/total?year=${date}&activeYn=${activeYn}` // activeYn 쿼리 파라미터 추가
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 > 입금리스트
export const getReceiptDeList = async ({
  axiosInstance,
  settlementYmd,
}: AxiosType & { settlementYmd: any }) => {
  try {
    const { data } = await axiosInstance.get(
      `/sum/deposit?settlementYmd=${settlementYmd}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 정산서 > 세금계산서 발행 리스트
export const getReceiptPublish = async ({
  axiosInstance,
  settlementYmd,
}: AxiosType & { settlementYmd: any }) => {
  try {
    const { data } = await axiosInstance.get(
      `/sum/tax?settlementYmd=${settlementYmd}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 엑셀 다운 핸들러
const excelDownloadHandler = (fileName: string, response: any) => {
  // Blob을 이용해 다운로드 링크 생성
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a") as any;
  link.href = url;
  link.setAttribute("download", fileName + ".xlsx"); // 다운로드 파일명 설정
  document.body.appendChild(link);
  link.click();

  // 생성된 링크 제거
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

//
// 정산서 > 입금리스트 > 엑셀 다운로드
export const downloadDeListExcel = async ({
  axiosInstance,
  filename,
  settlementYmd,
}: AxiosType & { filename: string; settlementYmd: any }) => {
  try {
    const response = await axiosInstance.get(
      `/sum/deposit/excel?settlementYmd=${settlementYmd}`,
      { responseType: "blob" }
    );

    excelDownloadHandler(filename, response);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};

//
// 정산서 > 입금리스트 > 엑셀 다운로드
export const downloadTextExcel = async ({
  axiosInstance,
  filename,
  settlementYmd,
}: AxiosType & { filename: string; settlementYmd: any }) => {
  try {
    const response = await axiosInstance.get(
      `/sum/tax/excel?settlementYmd=${settlementYmd}`,
      { responseType: "blob" }
    );

    excelDownloadHandler(filename, response);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};

//
// 정산서 > 총괄표 조회하기
export const getReceiptViews = async ({
  axiosInstance,
  settlementYmd,
}: AxiosType & { settlementYmd: any }) => {
  try {
    const { data } = await axiosInstance.get(
      `/sum?settlementYmd=${settlementYmd}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};
