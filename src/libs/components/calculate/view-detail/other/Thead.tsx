import { TxtSpan, V } from "@/_ui";
import { Interpolation, Theme } from "@emotion/react";

export default function Thead() {
  return (
    <V.Row margin={{ top: 20 }}>
      <V.Container minWidth={230} css={TdTheme}>
        <TxtSpan css={printTheme}>품목</TxtSpan>
      </V.Container>
      <V.Container minWidth={140} css={TdTheme}>
        <TxtSpan css={printTheme}>단가</TxtSpan>
      </V.Container>
      <V.Container minWidth={130} css={TdTheme}>
        <TxtSpan css={printTheme}>수량</TxtSpan>
      </V.Container>
      <V.Container minWidth={140} css={TdTheme}>
        <TxtSpan css={printTheme}>합계</TxtSpan>
      </V.Container>

      <V.Container minWidth={240} css={TdTheme}>
        <TxtSpan css={printTheme}>비고</TxtSpan>
      </V.Container>
    </V.Row>
  );
}

const TdTheme = {
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  backgroundColor: "#f8f8f8",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const printTheme = {
  "@media print": { fontSize: "10px" },
} as Interpolation<Theme>;
