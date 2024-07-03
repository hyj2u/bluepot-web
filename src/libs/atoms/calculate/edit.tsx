import { atom } from "recoil";

// 정산서 작성 > 데이터
export const editTablesAtom = atom<any[]>({
  key: "calculate-edit-tables-atom",
  default: [],
});

// 열관리
export const columnFiltersAtom = atom<
  {
    code: string;
    pkey: string | number;
    groupCode: string;
    groupName: string;
    name: string;
  }[]
>({
  key: "calculate-edit-columnFilter-atom",
  default: [],
});

// 매장명체크
export const checkAddTables = atom<any[]>({
  key: "calculate-check-add-tables-atom",
  default: [],
});

// 일괄입력 옵션 체크
export const choiceCategoryOption = atom<string>({
  key: "calculate-choice-option-tables-atom",
  default: "",
});
