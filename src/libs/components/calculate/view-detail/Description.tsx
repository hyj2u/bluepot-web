import { Txt, V } from "@/_ui";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useMoment } from "@/libs/hooks";
import { colors } from "@/libs/themes";
import moment from "moment";
import { forwardRef } from "react";
import { useRecoilValue } from "recoil";

const Description = forwardRef(({ data }: { data: any }) => {
  const detailData = useRecoilValue(viewDetailAtom);

  const nextMonth = data?.settlementYmd
    ? moment(data.settlementYmd).add(1, "months").format("YYYY년 MM월")
    : "준비 중..";

  return (
    
    <V.Column align="center" padding={{ top: 24 }} gap={24}>
      <V.Row width="auto" wrap="wrap" crossGap={12} gap={24}>
        {[
          data?.storeName,
          data?.owner ? data?.owner : "준비 중 ..",
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

      <V.Container
        align="center"
        backgroundColor={
          detailData.settlementTotal.closedYn === "N" ? "#f6f7fc" : colors.redBg
        }
        padding={{ all: 11 }}
        borderRadius={12}
      >
        <Txt
          size={14}
          color={
            detailData.settlementTotal.closedYn === "N" ? "#797979" : colors.red
          }
        >
          {detailData.settlementTotal.closedYn === "N"
            ? " 아래 값들을 수정 시 반드시 저장하세요"
            : "정산이 완료된 상태이며, 수정이 불가능합니다"}
        </Txt>
      </V.Container>
    </V.Column>
  );
});

export { Description };
