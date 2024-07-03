//
// 매장관리
export const getAllStores = async ({
  axiosInstance,
  activeYn = "Y",
  brandCd = "",
  search = "",
}: AxiosType & {
  activeYn?: any;
  brandCd?: any;
  search?: any;
}) => {
  try {
    const result = await axiosInstance.get(
      `/store?activeYn=${activeYn}&brandCd=${brandCd}&search=${search}`
    );
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장추가 > 정산구분
export const getStoreBrandCdKind = async ({
  axiosInstance,
  brandCd = "",
}: AxiosType & {
  brandCd?: any;
}) => {
  try {
    const { data } = await axiosInstance.get(`/code/settle?brandCd=${brandCd}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장추가 > 사업자/오픈완료보고서 업로드
export const uploadStoreFiles = async ({
  axiosInstance,
  file,
  storeCode,
  fileType,
}: AxiosType & {
  file?: any;
  storeCode?: string;
  fileType: "business_num" | "open_fin";
}) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post(
      `/store/file/up`,
      { file, storeCode, fileType },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장추가 > 이미지 업로드
export const uploadStoreImages = async ({
  axiosInstance,
  file,
  storeCode,
}: AxiosType & {
  file?: any;
  storeCode?: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post(
      `/store/img/up`,
      { file, storeCode },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data?.fileName;
  } catch (error) {
    throw error;
  }
};

//
// 매장추가 > 사업자/오픈완료보고서 > 다운로드
export const getStoreFileData = async ({
  axiosInstance,
  storeCode,
  fileType,
  filename,
}: AxiosType & {
  storeCode?: string;
  fileType: "business_num" | "open_fin";
  filename: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `/store/file/down?storeCode=${storeCode}&fileType=${fileType}`,
      { responseType: "blob" }
    );

    // Blob을 이용해 다운로드 링크 생성
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a") as any;
    link.href = url;
    link.setAttribute("download", filename ?? "다운로드"); // 다운로드 파일명 설정
    document.body.appendChild(link);
    link.click();

    // 생성된 링크 제거
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url); // URL 객체 해제
  } catch (error) {
    throw error;
  }
};

//
// 매장추가 > 이미지 > 조회
export const getStoreImageList = async ({
  axiosInstance,
  storeCode,
}: AxiosType & {
  storeCode?: string;
}) => {
  try {
    const { data } = await axiosInstance.get(
      `/store/img?storeCode=${storeCode}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 파일삭제
export const deleteStoreImage = async ({
  axiosInstance,
  key,
}: AxiosType & {
  key?: string | number;
}) => {
  try {
    const { data } = await axiosInstance.delete(`/store/file/${key}`);
    return data;
  } catch (error) {
    throw error;
  }
};

//
// 매장 상세
export const getStoreDetail = async ({
  axiosInstance,
  pkey,
}: AxiosType & {
  pkey?: any;
}) => {
  try {
    const { data } = await axiosInstance.get(`/store/${pkey}`);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장 상세 > 연결정보
export const getStoreDetailConect = async ({
  axiosInstance,
  storeCode,
}: AxiosType & {
  storeCode: any;
}) => {
  try {
    const { data } = await axiosInstance.get(`/relation/${storeCode}`);
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장 상세 > 백업 단말기
export const getStoreDetailBackupNumbers = async ({
  axiosInstance,
  storeCode,
}: AxiosType & {
  storeCode: any;
}) => {
  try {
    const { data } = await axiosInstance.get(
      `/relation/terminal?storeCode=${storeCode}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장 상세 > 백업 단말기 > 수정
export const updateStoreDetailBackupNumbers = async ({
  axiosInstance,
  storeCode,
  relCode,
}: AxiosType & {
  storeCode: any;
  relCode: any;
}) => {
  try {
    const { data } = await axiosInstance.post(`/relation/terminal`, {
      storeCode,
      relCode,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

//
// 매장 상세 > 백업 단말기
export const getStoreDetailReceipts = async ({
  axiosInstance,
  storeCode,
  year,
}: AxiosType & {
  storeCode: any;
  year: any;
}) => {
  try {
    const { data } = await axiosInstance.get(
      `/store/settle?storeCode=${storeCode}&year=${year}`
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

//
// 매장등록 / 수정
export const updateStore = async ({
  axiosInstance,
  values,
}: AxiosType & {
  values: any;
}) => {
  try {
    const { data } = await axiosInstance.post(`/store`, values);
    return data?.data;
  } catch (error) {
    throw error;
  }
};
