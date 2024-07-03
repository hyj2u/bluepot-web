import { Txt, V } from "@/_ui";
import { useMoment } from "@/libs/hooks";
import moment from "moment";
import React from "react";

export default function Title({ settlementTotal }: { settlementTotal: any }) {
  const nextMonth = settlementTotal?.settlementYmd
    ? moment(settlementTotal.settlementYmd)
        .add(1, "months")
        .format("YYYY년 MM월")
    : "준비 중..";

  return (
    <V.Column css={{ "@media print": { padding: "0 20px" } }}>
      <Txt as="h1" size={24}>
        {settlementTotal?.settlementTitle ?? "-"}
      </Txt>

      <V.Row
        width="auto"
        wrap="wrap"
        crossGap={12}
        gap={24}
        margin={{ top: 16 }}
      >
        {[
          settlementTotal?.storeName,
          settlementTotal?.owner,
          nextMonth + " 09일",
        ].map((item, i) => (
          <V.Row key={i} gap={8} align="start" width="auto">
            <Txt size={15} color="#888">
              {i === 0 && "매장명 :"}
              {i === 1 && "점주명 :"}
              {i === 2 && "정산일 :"}
            </Txt>

            <Txt size={15} color="#666" weight="medium">
              {item}
            </Txt>
          </V.Row>
        ))}
      </V.Row>
    </V.Column>
  );
}
