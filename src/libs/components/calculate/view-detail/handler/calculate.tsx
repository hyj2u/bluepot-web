import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilValue } from "recoil";

export default function calculates() {
  const data = useRecoilValue(viewDetailAtom);
  const val = data?.settlementTotal ?? {};

  const 운영제경비 =
    (val?.b1rent ?? 0) +
    (val?.b1maint ?? 0) +
    (val?.b1electricity ?? 0) +
    (val?.b1gas ?? 0) +
    (val?.b1internet ?? 0) +
    (val?.b1etcExpense ?? 0) +
    (val?.b1extra1 ?? 0) +
    (val?.b1extra2 ?? 0) +
    (val?.b1extra3 ?? 0) +
    (val?.b1extra4 ?? 0) +
    (val?.b1extra5 ?? 0);

  const 상품대 =
    (val?.b3material ?? 0) +
    (val?.b3etc ?? 0) +
    (val?.b3extra1 ?? 0) +
    (val?.b3extra2 ?? 0) +
    (val?.b3extra3 ?? 0) +
    (val?.b3extra4 ?? 0) +
    (val?.b3extra5 ?? 0);

  const 기타 =
    (val?.b4initProduct ?? 0) +
    (val?.b4donation ?? 0) +
    (val?.b4extra1 ?? 0) +
    (val?.b4extra2 ?? 0) +
    (val?.b4extra3 ?? 0) +
    (val?.b4extra4 ?? 0) +
    (val?.b4extra5 ?? 0);

  const 기타제경비 =
    (val?.c1cardFee ?? 0) +
    (val?.c1rent ?? 0) +
    (val?.c1electricity ?? 0) +
    (val?.c1water ?? 0) +
    (val?.c1gas ?? 0) +
    (val?.c1insurance ?? 0) +
    (val?.c1etcExpense ?? 0) +
    (val?.c1extra1 ?? 0) +
    (val?.c1extra2 ?? 0) +
    (val?.c1extra3 ?? 0) +
    (val?.c1extra4 ?? 0) +
    (val?.c1extra5 ?? 0);

  const 기타2 =
    (val?.c2interestCost ?? 0) +
    (val?.c2extra1 ?? 0) +
    (val?.c2extra2 ?? 0) +
    (val?.c2extra3 ?? 0) +
    (val?.c2extra4 ?? 0) +
    (val?.c2extra5 ?? 0);

  const 미지급금 =
    (val?.d1storeMaint ?? 0) +
    (val?.d1carryover ?? 0) +
    (val?.d1material ?? 0) +
    (val?.d1extra1 ?? 0) +
    (val?.d1extra2 ?? 0) +
    (val?.d1extra3 ?? 0) +
    (val?.d1extra4 ?? 0) +
    (val?.d1extra5 ?? 0);

  const 선수금 =
    (val?.d2cash ?? 0) +
    (val?.d2extra1 ?? 0) +
    (val?.d2extra2 ?? 0) +
    (val?.d2extra3 ?? 0) +
    (val?.d2extra4 ?? 0) +
    (val?.d2extra5 ?? 0);

  const 선급금 =
    (val?.d3rent ?? 0) +
    (val?.d3initProduct ?? 0) +
    (val?.d3extra1 ?? 0) +
    (val?.d3extra2 ?? 0) +
    (val?.d3extra3 ?? 0) +
    (val?.d3extra4 ?? 0) +
    (val?.d3extra5 ?? 0);

  const A = val?.atotal;
  const B = val?.btotal;
  const C = val?.settlementAmount;
  const D = val?.salesProfit;
  const E = val?.depositAmount;

  return {
    A,
    B: {
      매출원가: B,
      운영제경비,
      상품대,
      기타,
    },
    C: {
      정산금액: C,
      기타제경비,
      기타: 기타2,
    },
    D: {
      매출이익: D,
      미지급금,
      선수금,
      선급금,
    },
    E,
  };
}
