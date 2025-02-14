import { colors } from "@/libs/themes";
import { Interpolation, Theme } from "@emotion/react";
import { useCurrencyPrice } from "@/libs/hooks";

//
type Props = {
  data: any;
  title:
    | "상품매출액"
    | "매출원가"
    | "운영제경비"
    | "수수료"
    | "상품대"
    | "B기타"
    | "정산금액"
    | "기타제경비"
    | "C기타"
    | "매출이익"
    | "미지급금"
    | "선수금"
    | "선급금"
    | "실입금액";
};

//
export default function TrTitle({ title, data }: Props) {
  const A =
    data?.a1cash +
    data?.a1tax +
    data?.a1card +
    data?.a1extra1 +
    data?.a1extra2 +
    data?.a1extra3 +
    data?.a1extra4 +
    data?.a1extra5;

  const B_운영제경비 =
    data?.b1rent +
    data?.b1maint +
    data?.b1electricity +
    data?.b1gas +
    data?.b1internet +
    data?.b1etcExpense +
    data?.b1extra1 +
    data?.b1extra2 +
    data?.b1extra3 +
    data?.b1extra4 +
    data?.b1extra5;

  const B_수수료 = data?.b2charge;

  const B_상품대 =
    data?.b3material +
    data?.b3etc +
    data?.b3extra1 +
    data?.b3extra2 +
    data?.b3extra3 +
    data?.b3extra4 +
    data?.b3extra5;

  const B_기타 =
    data?.b4initProduct +
    data?.b4donation +
    data?.b4extra1 +
    data?.b4extra2 +
    data?.b4extra3 +
    data?.b4extra4 +
    data?.b4extra5;

  const B = B_운영제경비 + B_수수료 + B_상품대 + B_기타;

  const C_기타제경비 =
    data?.c1cardFee +
    data?.c1rent +
    data?.c1electricity +
    data?.c1water +
    data?.c1gas +
    data?.c1insurance +
    data?.c1etcExpense +
    data?.c1extra1 +
    data?.c1extra2 +
    data?.c1extra3 +
    data?.c1extra4 +
    data?.c1extra5;

  const C_기타 =
    data?.c2interestCost +
    data?.c2extra1 +
    data?.c2extra2 +
    data?.c2extra3 +
    data?.c2extra4 +
    data?.c2extra5;

  const C = A - B;

  const D = A - B - C_기타제경비 - C_기타;

  const D_미지급금 =
    data?.d1storeMaint +
    data?.d1carryover +
    data?.d1material +
    data?.d1extra1 +
    data?.d1extra2 +
    data?.d1extra3 +
    data?.d1extra4 +
    data?.d1extra5;

  const D_선수금 =
    data?.d2cash +
    data?.d2extra1 +
    data?.d2extra2 +
    data?.d2extra3 +
    data?.d2extra4 +
    data?.d2extra5;

  const D_선급금 =
    data?.d3rent +
    data?.d3initProduct +
    data?.d3extra1 +
    data?.d3extra2 +
    data?.d3extra3 +
    data?.d3extra4 +
    data?.d3extra5;

  const E = D - D_미지급금 - D_선수금 + D_선급금;

  //
  if (title === "상품매출액") return <TrComp title="A. 상품매출액" 대변={A} />;

  if (title === "매출원가")
    return <TrComp title="B. 매출원가 (1+2+3+4)" 차변={B} />;

  if (title === "운영제경비")
    return <TrComp type="sub" title="1. 운영제경비 (합)" 차변={B_운영제경비} />;

  if (title === "수수료")
    return <TrComp type="sub" title="2. 수수료" 차변={B_수수료} />;

  if (title === "상품대")
    return <TrComp type="sub" title="3. 상품대 (합)" 차변={B_상품대} />;

  if (title === "B기타")
    return <TrComp type="sub" title="4. 기타 (합)" 차변={B_기타} />;

  if (title === "정산금액")
    return <TrComp title="C. 정산금액 (A - B)" 차변={C} />;

  if (title === "기타제경비")
    return <TrComp type="sub" title="1. 기타제경비 (합)" 차변={C_기타제경비} />;

  if (title === "C기타")
    return <TrComp type="sub" title="2. 기타 (합)" 차변={C_기타} />;

  if (title === "매출이익")
    return <TrComp title="D. 매출이익 (C - 1 - 2)" 차변={D} />;

  if (title === "미지급금")
    return <TrComp type="sub" title="a. 미지급금 (합)" 차변={D_미지급금} />;

  if (title === "선수금")
    return <TrComp type="sub" title="b. 선수금 (합)" 차변={D_선수금} />;

  if (title === "선급금")
    return <TrComp type="sub" title="c. 선급금 (합)" 대변={D_선급금} />;

  if (title === "실입금액")
    return <TrComp title="E. 정산금 실입금액 (D - a - b + c)" 차변={E} />;

  return null;
}

//
//
const TrComp = ({
  type = "title",
  title,
  대변,
  차변,
}: {
  type?: "title" | "sub";
  title: string;
  대변?: number;
  차변?: number;
}) => {
  return (
    <tr css={{ width: "100%" }}>
      <th css={type === "title" ? themes.th : themes.sub}>{title}</th>
      <th css={type === "title" ? themes2.th : themes2.sub}>
        {대변 && useCurrencyPrice(대변 ?? 0)}
      </th>
      <th css={type === "title" ? themes2.th : themes2.sub}>
        {차변 && useCurrencyPrice(차변 ?? 0)}
      </th>
      <th colSpan={4} css={type === "title" ? themes.th : themes.sub}></th>
    </tr>
  );
};

//
//
const t = {
  height: "100%",
  padding: "12px",
  borderRight: "1px solid #e2e2e2",
  fontSize: 14,
  fontWeight: "500",
  whiteSpace: "pre-line",
  textAlign: "left",
  "@media print": { fontSize: 13 },
};

const themes = {
  th: {
    ...t,
    color: colors.keyColor,
    backgroundColor: "#f1f4f7",
    borderBottom: "1px solid #ccc",
  } as Interpolation<Theme>,

  sub: {
    ...t,
    color: "#555",
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #e2e2e2",
  } as Interpolation<Theme>,
};

const themes2 = {
  th: {
    ...(themes.th as any),
    textAlign: "end",
  } as Interpolation<Theme>,

  sub: {
    ...(themes.sub as any),
    textAlign: "end",
  } as Interpolation<Theme>,
};
