import { TouchableOpacity, TxtSpan, V } from "@/_ui";
import { Interpolation, Theme } from "@emotion/react";
import TdField from "./TdField";
import { CancelIcon } from "@/libs/assets/icons";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilState } from "recoil";
import {useCurrencyFloatPrice} from "@/libs/hooks/useCurrencyPrice"

export default function Tr({ data }: { data: any }) {
  const [tData, setTData] = useRecoilState(viewDetailAtom);

  const onRemoveTable = () => {
    setTData((current: any) => {
      const filteredExtraSupplies =
        current.extraSupplies?.filter((el: any) => el.pkey !== data?.pkey) ||
        [];

      return {
        ...current,
        extraSupplies: filteredExtraSupplies,
      };
    });
  };

  return (
    <V.Row align="end">
      <V.Row height="100%" minWidth={230} css={TdTheme}>
        <TouchableOpacity
          height="100%"
          backgroundColor="#f8f8f8"
          padding={{ all: 8 }}
          css={{ "@media print": { display: "none" } }}
          onClick={() => onRemoveTable()}
        >
          <CancelIcon fill="#c2c2c2" width={15} />
        </TouchableOpacity>

        <TdField
          value={data?.item}
          pkey={data?.pkey}
          type="note"
          valKey="item"
        />
      </V.Row>

      <V.Container minWidth={140} css={TdFieldTheme}>
        <TdField
          value={data?.unitPrice || ""}
          pkey={data?.pkey}
          valKey="unitPrice"
          numberType="double"
        />
      </V.Container>

      <V.Container minWidth={130} css={TdFieldTheme}>
        <TdField
          value={data?.quantity || ""}
          pkey={data?.pkey}
          valKey="quantity"
          numberType="double"
        />
      </V.Container>

      <V.Container minWidth={160} minHeight={60} maxHeight={60} css={TdTheme}>
        <TxtSpan css={printTheme}>
          {useCurrencyFloatPrice(data?.unitPrice * data?.quantity)}
        </TxtSpan>
      </V.Container>

      <V.Container minWidth={240} css={TdFieldTheme}>
        <TdField
          value={data?.note}
          pkey={data?.pkey}
          type="note"
          valKey="note"
        />
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
  color: "#6a6a6",
  padding: "11px",
  fontWeight: 500,
  "@media print": { fontSize: "11px" },
} as Interpolation<Theme>;
