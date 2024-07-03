import { TxtSpan, V } from "@/_ui";
import { Interpolation, Theme } from "@emotion/react";
import TdField from "./TdField";

type Props = {
  t: string;
  aVal?: number | null;
  bVal?: number | null;
  note?: any;
  valKey: string;
  title?: boolean;
};

export default function Tr({ t, aVal, bVal, note, valKey, title }: Props) {
  return (
    <V.Row>
      <V.Container minWidth={180} maxWidth={180} css={TdTheme}>
        <TxtSpan
          css={{
            ...printTheme,
            fontWeight: title ? 500 : 500,
            color: title ? "#444" : "#777",
          }}
        >
          {t}
        </TxtSpan>
      </V.Container>

      <V.Container minWidth={150} maxWidth={150} css={TdFieldTheme}>
        {aVal !== null ? (
          <TdField value={aVal} valKey={valKey} />
        ) : (
          <TxtSpan css={noneTheme}>-</TxtSpan>
        )}
      </V.Container>

      <V.Container minWidth={150} maxWidth={150} css={TdFieldTheme}>
        {bVal !== null ? (
          <TdField value={bVal} valKey={valKey} />
        ) : (
          <TxtSpan css={noneTheme}>-</TxtSpan>
        )}
      </V.Container>

      <V.Container minWidth={240} css={TdTheme}>
        <TdField value={note} type="note" valKey={valKey + "Note"} />
      </V.Container>
    </V.Row>
  );
}

//
// theme
const TdTheme = {
  justifyContent: "center",
  backgroundColor: "#fff",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const TdFieldTheme = {
  justifyContent: "center",
  backgroundColor: "#fff",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const printTheme = {
  color: "#6a6a6a",
  padding: "11px",
  fontWeight: 500,
  "@media print": { fontSize: "11px" },
} as Interpolation<Theme> | any;

const noneTheme = {
  color: "#999",
  padding: "11px",
  fontWeight: 500,
  "@media print": { fontSize: "11px" },
} as Interpolation<Theme>;
