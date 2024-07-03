import { Txt, TxtSpan, V } from "@/_ui";
import { useCurrencyPrice } from "@/libs/hooks";
import { Interpolation, Theme } from "@emotion/react";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilValue } from "recoil";
import { calculates } from "../handler";

type Props = {
  category:
    | "A"
    | "B"
    | "B_1"
    | "B_3"
    | "B_4"
    | "C"
    | "C_1"
    | "C_2"
    | "D"
    | "D_1"
    | "D_2"
    | "D_3"
    | "E";
};

export default function TitleTr({ category }: Props) {
  const data = useRecoilValue(viewDetailAtom);
  const val = data?.settlementTotal ?? {};
  const { A, B, C, D, E } = calculates();

  if (category === "A") return <Table t="A.상품매출액" a={A} />;

  if (category === "B")
    return <Table t="B.매출원가 (1+2+3+4)" b={B.매출원가} />;

  if (category === "B_1")
    return <Table t="1. 운영제경비 (합)" type="sub" b={B.운영제경비} />;

  if (category === "B_3")
    return <Table t="3. 상품대 (합)" type="sub" b={B.상품대} />;

  if (category === "B_4")
    return <Table t="4. 기타 (합)" type="sub" b={B.기타} />;

  if (category === "C") return <Table t="C. 정산금액 (A - B)" b={C.정산금액} />;

  if (category === "C_1")
    return <Table t="1. 기타제경비 (합)" type="sub" b={C.기타제경비} />;

  if (category === "C_2")
    return <Table t="2. 기타 (합)" type="sub" b={C.기타} />;

  if (category === "D")
    return <Table t="D. 매출이익 (C - 1 - 2)" b={D.매출이익} />;

  if (category === "D_1")
    return <Table t="a. 미지급금 (합)" type="sub" b={D.미지급금} />;

  if (category === "D_2")
    return <Table t="b. 선수금 (합)" type="sub" b={D.선수금} />;

  if (category === "D_3")
    return <Table t="c. 선급금 (합)" type="sub" a={D.선급금} />;

  if (category === "E")
    return <Table t="E. 정산금 실입금액 (D - a - b + c)" b={E} />;
}

//
// table
const Table = ({
  t,
  a,
  b,
  type = "title",
}: {
  t: string;
  a?: number;
  b?: number;
  type?: "title" | "sub";
}) => (
  <V.Row>
    <V.Container
      minWidth={180}
      maxWidth={180}
      minHeight={42}
      css={type === "title" ? tdTheme : subTdTheme}
    >
      <Txt css={type === "title" ? printTheme : subPrintTheme}>{t}</Txt>
    </V.Container>

    <V.Container
      minWidth={150}
      maxWidth={150}
      minHeight={42}
      height="100%"
      css={type === "title" ? tdTheme : subTdTheme}
    >
      <Txt css={type === "title" ? printTheme : subPrintTheme}>
        {a ? useCurrencyPrice(a) : ""}
      </Txt>
    </V.Container>

    <V.Container
      minWidth={150}
      maxWidth={150}
      minHeight={42}
      height="100%"
      css={type === "title" ? tdTheme : subTdTheme}
    >
      <Txt css={type === "title" ? printTheme : subPrintTheme}>
        {b || typeof b === "number" ? useCurrencyPrice(b) : ""}
      </Txt>
    </V.Container>

    <V.Container
      minWidth={240}
      minHeight={42}
      height="100%"
      css={type === "title" ? tdTheme : subTdTheme}
    >
      <TxtSpan css={type === "title" ? printTheme : subPrintTheme}>
        {""}
      </TxtSpan>
    </V.Container>
  </V.Row>
);

//
// theme
const tdTheme = {
  justifyContent: "center",
  padding: "11px",
  backgroundColor: "#f1f4f7",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const printTheme = {
  color: "#7FA7CA",
  fontSize: 13,
  fontWeight: 600,
  "@media print": { fontSize: "11px" },
} as Interpolation<Theme>;

const subTdTheme = {
  justifyContent: "center",
  padding: "11px",
  backgroundColor: "#fff",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const subPrintTheme = {
  color: "#444",
  fontWeight: 500,
  fontSize: 13,
  "@media print": { fontSize: "11px" },
} as Interpolation<Theme>;
