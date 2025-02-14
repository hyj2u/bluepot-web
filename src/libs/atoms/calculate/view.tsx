import { atom } from "recoil";

// 정산서 상세 > 테이블
type DetailProps = {
  settlementTotal: settlementTotalType;
  extraSupplies: extraSupplies;
};

type settlementTotalType = {
  a1cash: any;
  a1cashNote: any;
  a1card: any;
  a1cardNote: any;

  b1rent: any;
  b1rentNote: any;
  b1maint: any;
  b1maintNote: any;
  b1electricity: any;
  b1electricityNote: any;
  b1gas: any;
  b1gasNote: any;
  b1internet: any;
  b1internetNote: any;
  b1etcExpense: any;
  b1etcExpenseNote: any;
  b2charge: any;
  b2chargeNote: any;
  b3material: any;
  b3materialNote: any;
  b3etc: any;
  b3etcNote: any;
  b4initProduct: any;
  b4initProductNote: any;
  b4donation: any;
  b4donationNote: any;
  c1cardFee: any;
  c1cardFeeNote: any;
  c1rent: any;
  c1rentNote: any;
  c1electricity: any;
  c1electricityNote: any;
  c1water: any;
  c1waterNote: any;
  c1gas: any;
  c1gasNote: any;
  c1insurance: any;
  c1insuranceNote: any;
  c1etcExpense: any;
  c1etcExpenseNote: any;
  c2interestCost: any;
  c2interestCostNote: any;

  d1storeMaint: any;
  d1storeMaintNote: any;
  d1material: any;
  d1materialNote: any;
  d1carryover: any;
  d1carryoverNote: any;
  d2cash: any;
  d2cashNote: any;

  d3rent: any;
  d3rentNote: any;
  d3initProduct: any;
  d3initProductNote: any;
};

type extraSupplies = {
  pkey: number | string;
  item: string;
  unitPrice: string | number;
  quantity: string | number;
}[];

export const initialSettlementTotal = {
  closedYn: "N",
  a1cash: 0,
  a1cashNote: null,
  a1card: 0,
  a1cardNote: null,

  b1rent: 0,
  b1rentNote: null,
  b1maint: 0,
  b1maintNote: null,
  b1electricity: 0,
  b1electricityNote: null,
  b1gas: 0,
  b1gasNote: null,
  b1internet: 0,
  b1internetNote: null,
  b1etcExpense: 0,
  b1etcExpenseNote: null,
  b2charge: 0,
  b2chargeNote: null,
  b3material: 0,
  b3materialNote: null,
  b3etc: 0,
  b3etcNote: null,
  b4initProduct: 0,
  b4initProductNote: null,
  b4donation: 0,
  b4donationNote: null,
  c1cardFee: 0,
  c1cardFeeNote: null,
  c1rent: 0,
  c1rentNote: null,
  c1electricity: 0,
  c1electricityNote: null,
  c1water: 0,
  c1waterNote: null,
  c1gas: 0,
  c1gasNote: null,
  c1insurance: 0,
  c1insuranceNote: null,
  c1etcExpense: 0,
  c1etcExpenseNote: null,
  c2interestCost: 0,
  c2interestCostNote: null,

  d1storeMaint: 0,
  d1storeMaintNote: null,
  d1material: 0,
  d1materialNote: null,
  d1carryover: 0,
  d1carryoverNote: null,
  d2cash: 0,
  d2cashNote: null,

  d3rent: 0,
  d3rentNote: null,
  d3initProduct: 0,
  d3initProductNote: null,
};

export const viewDetailAtom = atom<DetailProps | any>({
  key: "view-detail-table-atom",
  default: { settlementTotal: initialSettlementTotal, extraSupplies: [] },
});

export const viewDetailOpions = atom({
  key: "view-detail-opion-atom",
  default: {
    storeCode: "",
    storeName: "",
  },
});

//
// 테이블 추가기능
export const addTableFieldsAtom = atom<string[]>({
  key: "view-detail-table-fields-atom",
  default: [],
});

//
// 인쇄 핸들러
export const printActiveAtom = atom<boolean>({
  key: "view-detail-print-atom",
  default: false,
});
