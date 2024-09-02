import { TouchableOpacity, TxtSpan, V } from "@/_ui";
import { Interpolation, Theme } from "@emotion/react";
import TdField from "./TdField";
import { CancelIcon } from "@/libs/assets/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addTableFieldsAtom,
  viewDetailAtom,
} from "@/libs/atoms/calculate/view";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

type Props = {
  t: string;
  aVal?: number | null;
  bVal?: number | null;
  note?: any;
  valKey: string;
  title?: boolean;
};

export default function AddTr({ t, aVal, bVal, note, valKey }: Props) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const [tData, setTData] = useRecoilState(viewDetailAtom);
  const [addFields, setAddFields] = useRecoilState(addTableFieldsAtom);

  const onRemoveAddField = () => {
    setTData({
      ...tData,
      settlementTotal: {
        ...tData.settlementTotal,
        [valKey + "name"]: "",
        [valKey]: 0,
        [valKey + "note"]: "",
      },
    });

    setAddFields((current: any) => {
      const filteredExtraSupplies =
        current?.filter((el: any) => el !== valKey) || [];

      return filteredExtraSupplies;
    });
  };

  return (
    <V.Row>
      <V.Container
        minWidth={180}
        maxWidth={180}
        height="100%"
        direction="horizontal"
        css={TdTheme}
      >
        {(appUserStatus.rule === "ROLE_ADMIN" || appUserStatus.rule==="ROLE_MANAGER" )&& (
          <TouchableOpacity
            height="100%"
            backgroundColor="#f8f8f8"
            padding={{ all: 8 }}
            css={{ "@media print": { display: "none" } }}
            onClick={() => onRemoveAddField()}
          >
            <CancelIcon fill="#c2c2c2" width={15} />
          </TouchableOpacity>
        )}
        <TdField value={t} type="note" valKey={valKey + "name"} />
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
        <TdField value={note} type="note" valKey={valKey + "note"} />
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
