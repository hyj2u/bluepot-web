import { Interpolation, Theme } from "@emotion/react";

//libs
import { Txt, TxtSpan, V } from "@/_ui";
import FlatList from "react-flatlist-ui";
import { useCurrencyPrice } from "@/libs/hooks";

//
export const Order = ({ data }: { data: any }) => {
  return (
    <V.Column padding={{ top: 40, bottom: 20 }}>
      <Txt weight="bold">기타항목</Txt>

      <V.ScrollDragHorizontal>
        <V.Column>
          <V.Row margin={{ top: 20 }}>
            {["품목", "단가", "수량", "합계", "비고"].map((item, i) => (
              <V.Container
                minWidth={(i == 0 && 180) || (i == 4 && 240) || 140}
                css={ThTheme}
              >
                <TxtSpan css={printTheme}>{item}</TxtSpan>
              </V.Container>
            ))}
          </V.Row>

          <FlatList
            data={data}
            keyExtractor={(item) => item.pkey}
            renderItem={(el, i) => (
              <V.Row>
                {[
                  el?.item,
                  el?.unitPrice,
                  el?.quantity,
                  useCurrencyPrice(el?.unitPrice * el?.quantity),
                  el?.note ?? "-",
                ].map((de, i) => (
                  <V.Container
                    minWidth={(i == 0 && 180) || (i == 4 && 240) || 140}
                    css={TdTheme}
                  >
                    <Txt
                      size={14}
                      css={{ "@media print": { fontSize: "13px" } }}
                    >
                      {de}
                    </Txt>
                  </V.Container>
                ))}
              </V.Row>
            )}
          />
        </V.Column>
      </V.ScrollDragHorizontal>
    </V.Column>
  );
};

const ThTheme = {
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  backgroundColor: "#f8f8f8",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const TdTheme = {
  alignItems: "start",
  justifyContent: "center",
  padding: 10,
  backgroundColor: "#fff",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
} as Interpolation<Theme>;

const printTheme = {
  "@media print": { fontSize: "12px" },
} as Interpolation<Theme>;
