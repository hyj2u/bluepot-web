import { API } from "./apis";

//
// 점주들 공개 > 정산서 상세
export const getPublicReceipt = async ({
  storeCode,
  settlementYmd,
}: {
  storeCode: any;
  settlementYmd: any;
}) => {
  try {
    const result = await API.get(
      `/settle/secret?code=${storeCode}&settlementYmd=${settlementYmd}
      `
    );
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};
