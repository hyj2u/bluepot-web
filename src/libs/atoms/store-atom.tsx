import { atom } from "recoil";

export const initialStoreType = {
  pkey: null,
  type: null as null | "이관" | "폐점" | "로딩",
  storeCode: "",
};

export const initialStoreValues = {
  activeYn: "Y", // 폐점,이관 유무
  brandCd: "", // 브랜드 *
  settlementCd: "", // 정산구분
  manager: "", // 담당자 *
  contractor: "", // 계약자
  storeName: "", // 상호면
  owner: "", // 점주명
  openYmd: "", // 오픈일
  orgContractYmd: "", // 최초 계약일
  writtenContractYmd: "", // 서면 계약일
  finalContractYmd: "", // 최종 재계약
  bank: "", // 은행
  bankAccount: "", // 예금주
  bankAccountNumber: "", // 계좌번호
  phone: "", // 연락처
  email: "", // 이메일
  homeAdress: "", // 자택주소
  storeAddress: "", // 사업장주소
  isp: "", // 인터넷통신사
  etc: "", // 비고
  fireInsurance: "", // 화재보험증권번호
  disasterInsurance: "", // 재난배상책임보험
  storeSize: "", // 실평수
  deposit: "", // 보증금
  vat: "", // 부가세
  maint: "", // 관리비
  businessGuarantee: "", // 영업보장
  charge: "", // 수수료
  openNote: "", // 주요내용
  prepaidRent: "", // 임대로 선납금
  prepaidMonth: "", // 선납개월수
  rentFromYmd: "", // 임대 시작일

  contracts: [], // 계약 시작일/종료일/임대료
};

export const initialStoreFiles = {
  business: { name: "", key: "" }, // 사업자등록증
  fin: { name: "", key: "" }, // 보고서
  images: [], // 이미지
};

export const initialStoreActiveYnValues = {
  closingYmd: "", // 폐점일
  closingDesc: "", // 폐점내용
};

//
//
// 매장등록  > 타입
export const store_type_atom = atom({
  key: "store-types-atom",
  default: initialStoreType,
});

//
// 매장등록 > 입력
export const storeValuesAtom = atom({
  key: "store-values-atom",
  default: {
    activeYn: "Y", // 폐점,이관 유무
    brandCd: "", // 브랜드 *
    settlementCd: "", // 정산구분
    manager: "", // 담당자 *
    contractor: "", // 계약자
    storeName: "", // 상호면
    owner: "", // 점주명
    openYmd: "", // 오픈일
    orgContractYmd: "", // 최초 계약일
    writtenContractYmd: "", // 서면 계약일
    finalContractYmd: "", // 최종 재계약
    bank: "", // 은행
    bankAccount: "", // 예금주
    bankAccountNumber: "", // 계좌번호
    phone: "", // 연락처
    email: "", // 이메일
    homeAdress: "", // 자택주소
    storeAddress: "", // 사업장주소
    isp: "", // 인터넷통신사
    etc: "", // 비고
    fireInsurance: "", // 화재보험증권번호
    disasterInsurance: "", // 재난배상책임보험
    storeSize: "", // 실평수
    deposit: "", // 보증금
    vat: "", // 부가세
    maint: "", // 관리비
    businessGuarantee: "", // 영업보장
    charge: "", // 수수료
    openNote: "", // 주요내용
    prepaidRent: "", // 임대로 선납금
    prepaidMonth: "", // 선납개월수
    rentFromYmd: "", // 임대 시작일
    donationYn: "N", //기부금대상 여부
    contracts: [], // 계약 시작일/종료일/임대료
  },
});

//
// 매장등록 > 파일 관리
export const store_files_atom = atom({
  key: "store-files-atom",
  default: initialStoreFiles,
});

//
// 폐점 및 이관정보 > 입력
export const store_activeYn_values_atom = atom({
  key: "store-activeYn-values-atom",
  default: initialStoreActiveYnValues,
});

//
// 상세 > 연경정보
export const store_connect_atom = atom<
  { storeCode: string; scrapGb: string; relCode: string }[]
>({
  key: "store_conenct_atom",
  default: [],
});
