import { useRecoilValue } from "recoil";
import Filter1 from "./Filter1";
import Filter2 from "./Filter2";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { Td } from "./Td";
import { columnFiltersAtom } from "@/libs/atoms/calculate/edit";
import UpdateFilter from "./UpdateFilter";
import AddFieldTab from "../view-detail/coast/AddFieldTabs";

//
// 열 관리 핸들링
const findTh = (items: string) => {
  const filters = useRecoilValue(columnFiltersAtom);

  const filter = filters.find((el) => el.code === items);
  return filter ? filter["code"] : "";
};

export {
  Filter1,
  Filter2,
  UpdateFilter,
  Tbody,
  Thead,
  Td,
  findTh,
  AddFieldTab,
};
