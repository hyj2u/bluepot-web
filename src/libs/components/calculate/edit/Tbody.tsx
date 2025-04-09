import { Checkbox, V } from "@/_ui";
import { Td, findTh } from ".";

//hooks
import { useCurrencyPrice } from "@/libs/hooks";
import { useRecoilState } from "recoil";
import { checkAddTables } from "@/libs/atoms/calculate/edit";
import { ChangeEvent, useCallback } from "react";

//
export default function Tbody({ data }: { data: any }) {
  const [checkTable, setCheckTable] = useRecoilState(checkAddTables);

  //
  // 매장 체크 핸들러
  const handleCheckTable = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target ?? {};
      if (checked) {
        setCheckTable([...checkTable, data]);
      } else
        setCheckTable((el) =>
          el.filter((list) => list.storeCode !== data.storeCode)
        );
    },
    [data, checkTable]
  );

  return (
    <V.Row>
      <V.Container
        padding={{ all: 11 }}
        minWidth={180}
        maxWidth={180}
        border={{ solid: 1, position: "bottom", color: "#e2e2e2" }}
        css={{ borderRight: "1px solid #e2e2e2" }}
        direction="horizontal"
        align="center"
      >
        <Checkbox
          id={data?.storeName}
          label={{ title: data.storeName }}
          themes={{ label: { titleWeight: "medium", titleSize: 14 } }}
          checked={checkTable.some((el) => el.storeCode === data?.storeCode)}
          onChange={handleCheckTable}
        />
      </V.Container>

      {/* 상품매출액 > 현금 */}
      {TdContainer({ cate: "a1cash", value: data?.a1cash })}

      {/* 상품매출액 > 세금계산서 */}
      {TdContainer({ cate: "a1tax", value: data?.a1tax })}

      {/* 상품매출액 > 신용 */}
      {TdContainer({ cate: "a1card", value: data?.a1card })}

      {/* --------------- */}
      {/* 매출원가 > 임대료 */}
      {TdContainer({ key: "b1rent", value: data?.b1rent })}

      {/* 매출원가 > 관리비 */}
      {TdContainer({ key: "b1maint", value: data?.b1maint })}

      {/* 매출원가 > 전기요금 */}
      {TdContainer({ key: "b1electricity", value: data?.b1electricity })}

      {/* 매출원가 > 도시가스 */}
      {TdContainer({ key: "b1gas", value: data?.b1gas })}

      {/* 매출원가 > 인터넷 */}
      {TdContainer({ key: "b1internet", value: data?.b1internet })}
      
      {/* 매출원가 > 기타경비 */}
      {TdContainer({ key: "b1etcExpense", value: data?.b1etcExpense })}

      {/* 매출원가 > 수수료 */}
      {TdContainer({ key: "b2charge", value: data?.b2charge })}

      {/* 매출원가 > 기타비품 */}
      {TdContainer({ key: "b3etc", value: data?.b3etc })}

      {/* 매출원가 > 초도물품대 */}
      {TdContainer({ key: "b4initProduct", value: data?.b4initProduct })}
      {/* 매출원가 > 기부금 */}
      {TdContainer({ key: "b4donation", value: data?.b4donation })}
      {/* 매출원가 > 원부자재 */}
      {TdContainer({ cate: "b3material", value: data?.b3material })}

      {/* --------------- */}
      {/* 정산금액 > 카드수수료 */}
      {TdContainer({ cate: "c1cardFee", value: data?.c1cardFee })}

      {/* 정산금액 > 전기요금 */}
      {TdContainer({ cate: "c1electricity", value: data?.c1electricity })}

      {/* 정산금액 > 관리비 */}
      {TdContainer({ key: "c1rent", value: data?.c1rent })}

      {/* 정산금액 > 수도요금 */}
      {TdContainer({ key: "c1water", value: data?.c1water })}

      {/* 정산금액 > 도시가스 */}
      {TdContainer({ key: "c1gas", value: data?.c1gas })}

      {/* 정산금액 > 배상책임보험 */}
      {TdContainer({ key: "c1insurance", value: data?.c1insurance })}

      {/* 정산금액 > 기타경비 */}
      {TdContainer({ key: "c1etcExpense", value: data?.c1etcExpense })}

      {/* 정산금액 > 이자비용 */}
      {TdContainer({ key: "c2interestCost", value: data?.c2interestCost })}

      {/* 매출이익 >  원부자재 */}
      {TdContainer({ cate: "d1material", value: data?.d1material })}

      {/* 매출이익 >  매장관리비 */}
      {TdContainer({ key: "d1storeMaint", value: data?.d1storeMaint })}

      {/* 매출이익 >  전월이월금 */}
      {TdContainer({ key: "d1carryover", value: data?.d1carryover })}

      {/* 매출이익 >  현금매출 */}
      {TdContainer({ key: "d2cash", value: data?.d2cash })}

      {/* 매출이익 >  임대료 */}
      {TdContainer({ key: "d3rent", value: data?.d3rent })}

      {/* 매출이익 >  초도물품대 */}
      {TdContainer({ key: "d3initProduct", value: data?.d3initProduct })}
    </V.Row>
  );
}

const TdContainer = ({
  key,
  value,
  cate,
}: {
  key?: any;
  cate?: string;
  value?: any;
  id?: string;
}) => {
  if (key)
    return (
      findTh(key) && <Td category={key} value={useCurrencyPrice(value ?? 0)} />
    );
  else
    return <Td category={cate ?? null} value={useCurrencyPrice(value ?? 0)} />;
};
