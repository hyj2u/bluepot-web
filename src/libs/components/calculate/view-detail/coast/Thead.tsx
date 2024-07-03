import { TxtSpan, V } from "@/_ui";
import { Interpolation, Theme } from "@emotion/react";

export default function Thead() {
  return (
    <V.Row>
      <V.Container minWidth={180} maxWidth={180} css={TdTheme}>
        <TxtSpan css={printTheme}>구분</TxtSpan>
      </V.Container>
      <V.Container minWidth={150} maxWidth={150} css={TdTheme}>
        <TxtSpan css={printTheme}>차변</TxtSpan>
      </V.Container>
      <V.Container minWidth={150} maxWidth={150} css={TdTheme}>
        <TxtSpan css={printTheme}>대변</TxtSpan>
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
