import React, { useRef } from "react";
import { Interpolation, Theme } from "@emotion/react";
import { useRouter } from "next/router";

//libs
import { LoadingSpinner, T, TouchableOpacity, Txt, V } from "@/_ui";
import { DragTable, View } from "@/libs/components/app";
import { Thead, TrTitle, Td } from "@/libs/components/calculate/receipt-view";

//hooks
import { getReceiptViews } from "@/_https/calculate/receipts";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import ReactToPrint from "react-to-print";

//
export default function Index() {
  const router = useRouter();
  const { id: settlementYmd } = router?.query ?? {};
  const tableRef = useRef<HTMLDivElement | null | any>(null);
  const { axiosInstance, queryKeys, useQuery } = useTanstackQuery();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.receipts.view],
    queryFn: () => getReceiptViews({ axiosInstance, settlementYmd }),
    enabled: !!settlementYmd,
  });



  return (
    <View>
      <V.Column align="start" ref={tableRef} padding={{ bottom: 30 }}>
        <Txt
          as="h1"
          size={24}
          css={{ "@media print": { fontSize: 15, padding: "20px" } }}
        >
          {settlementYmd?.slice(0, 4)}년 {settlementYmd?.slice(5, 7)}월 정산서
          총괄표
        </Txt>

        <V.Row
          gap={8}
          padding={{ top: 20, bottom: 30 }}
          css={{ "@media print": { display: "none" } }}
        >
          <TouchableOpacity
            backgroundColor="#f0f0f0"
            txtColor="#999"
            css={themes.tab}
            onClick={() => router.back()}
          >
            목록으로
          </TouchableOpacity>

          <ReactToPrint
            content={() => (tableRef?.current ? tableRef?.current : undefined)}
            trigger={() => (
              <TouchableOpacity
                backgroundColor="#4A9BFA"
                txtColor="#fff"
                css={themes.tab}
              >
                인쇄하기
              </TouchableOpacity>
            )}
          />
        </V.Row>

        {isLoading ? (
          <V.Container align="center">
            <LoadingSpinner />
          </V.Container>
        ) : (
          <DragTable>
            <T.Table>
              <Thead />

              <tbody css={{ width: "100%" }}>
                {/* ---------- */}
                <TrTitle title="상품매출액" data={data} />
                {[
                  { title: "현금", val: data?.a1cash, note: data?.a1cashNote },
                  {
                    title: "세금계산서",
                    val: data?.a1tax ?? 0,
                    note: data?.a1taxNote,
                  },
                  {
                    title: "신용카드",
                    val: data?.a1card,
                    note: data?.a1cardNote,
                  },
                  {
                    title: data?.a1extra1name,
                    val: data?.a1extra1,
                    note: data?.a1extra1Note,
                  },
                  {
                    title: data?.a1extra2name,
                    val: data?.a1extra2,
                    note: data?.a1extra2Note,
                  },
                  {
                    title: data?.a1extra3name,
                    val: data?.a1extra3,
                    note: data?.a1extra3Note,
                  },
                  {
                    title: data?.a1extra4name,
                    val: data?.a1extra4,
                    note: data?.a1extra4Note,
                  },
                  {
                    title: data?.a1extra5name,
                    val: data?.a1extra5,
                    note: data?.a1extra5Note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 대변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="매출원가" data={data} />

                {/* ---------- */}
                <TrTitle title="운영제경비" data={data} />
                {[
                  {
                    title: "임대료",
                    val: data?.b1rent,
                    note: data?.b1rentNote,
                  },
                  {
                    title: "관리비",
                    val: data?.b1maint,
                    note: data?.b1maintNote,
                  },
                  {
                    title: "전기요금",
                    val: data?.b1electricity,
                    note: data?.b1electricityNote,
                  },
                  {
                    title: "도시가스",
                    val: data?.b1gas,
                    note: data?.b1gasNote,
                  },
                  {
                    title: "인터넷",
                    val: data?.b1internet,
                    note: data?.b1internetNote,
                  },
                  {
                    title: "기타경비",
                    val: data?.b1etcExpense,
                    note: data?.b1etcExpenseNote,
                  },
                  {
                    title: data?.b1extra1name,
                    val: data?.b1extra1,
                    note: data?.b1extra1note,
                  },
                  {
                    title: data?.b1extra2name,
                    val: data?.b1extra2,
                    note: data?.b1extra2note,
                  },
                  {
                    title: data?.b1extra3name,
                    val: data?.b1extra3,
                    note: data?.b1extra3note,
                  },
                  {
                    title: data?.b1extra4name,
                    val: data?.b1extra4,
                    note: data?.b1extra4note,
                  },
                  {
                    title: data?.b1extra5name,
                    val: data?.b1extra5,
                    note: data?.b1extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}


                {/* ---------- */}
                <TrTitle title="상품대" data={data} />
                {[
                  {
                    title: "원부자재(과세)",
                    val: data?.b3material,
                    note: data?.b3materialNote,
                  },
                  {
                    title: "기타비품",
                    val: data?.b3etc,
                    note: data?.b3etcNote,
                  },
                  {
                    title: data?.b3extra1name,
                    val: data?.b3extra1,
                    note: data?.b3extra1note,
                  },
                  {
                    title: data?.b3extra2name,
                    val: data?.b3extra2,
                    note: data?.b3extra2note,
                  },
                  {
                    title: data?.b3extra3name,
                    val: data?.b3extra3,
                    note: data?.b3extra3note,
                  },
                  {
                    title: data?.b3extra4name,
                    val: data?.b3extra4,
                    note: data?.b3extra4note,
                  },
                  {
                    title: data?.b3extra5name,
                    val: data?.b3extra5,
                    note: data?.b3extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="B기타" data={data} />
                {[
                  {
                    title: "초도물품대",
                    val: data?.b4initProduct,
                    note: data?.b4initProductNote,
                  },
                  {
                    title: data?.b4extra1name,
                    val: data?.b4extra1,
                    note: data?.b4extra1note,
                  },
                  {
                    title: data?.b4extra2name,
                    val: data?.b4extra2,
                    note: data?.b4extra2note,
                  },
                  {
                    title: data?.b4extra3name,
                    val: data?.b4extra3,
                    note: data?.b4extra3note,
                  },
                  {
                    title: data?.b4extra4name,
                    val: data?.b4extra4,
                    note: data?.b4extra4note,
                  },
                  {
                    title: data?.b4extra5name,
                    val: data?.b4extra5,
                    note: data?.b4extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="정산금액" data={data} />
                <TrTitle title="기타제경비" data={data} />
                {[
                  {
                    title: "카드수수료",
                    val: data?.c1cardFee,
                    note: data?.c1cardFeeNote,
                  },
                  {
                    title: "관리비",
                    val: data?.c1rent,
                    note: data?.c1rentNote,
                  },
                  {
                    title: "전기요금",
                    val: data?.c1electricity,
                    note: data?.c1electricityNote,
                  },
                  {
                    title: "수도요금",
                    val: data?.c1water,
                    note: data?.c1waterNote,
                  },
                  {
                    title: "도시가스",
                    val: data?.c1gas,
                    note: data?.c1gasNote,
                  },
                  {
                    title: "배상책임보험",
                    val: data?.c1insurance,
                    note: data?.c1insuranceNote,
                  },
                  {
                    title: "기타경비",
                    val: data?.c1etcExpense,
                    note: data?.c1etcExpenseNote,
                  },
                  {
                    title: data?.c1extra1name,
                    val: data?.c1extra1,
                    note: data?.c1extra1note,
                  },
                  {
                    title: data?.c1extra2name,
                    val: data?.c1extra2,
                    note: data?.c1extra2note,
                  },
                  {
                    title: data?.c1extra3name,
                    val: data?.c1extra3,
                    note: data?.c1extra3note,
                  },
                  {
                    title: data?.c1extra4name,
                    val: data?.c1extra4,
                    note: data?.c1extra4note,
                  },
                  {
                    title: data?.c1extra5name,
                    val: data?.c1extra5,
                    note: data?.c1extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="C기타" data={data} />
                {[
                  {
                    title: "이자비용",
                    val: data?.c2interestCost,
                    note: data?.c2interestCostNote,
                  },
                  {
                    title: data?.c2extra1name,
                    val: data?.c2extra1,
                    note: data?.c2extra1note,
                  },
                  {
                    title: data?.c2extra2name,
                    val: data?.c2extra2,
                    note: data?.c2extra2note,
                  },
                  {
                    title: data?.c2extra3name,
                    val: data?.c2extra3,
                    note: data?.c2extra3note,
                  },
                  {
                    title: data?.c2extra4name,
                    val: data?.c2extra4,
                    note: data?.c2extra4note,
                  },
                  {
                    title: data?.c2extra5name,
                    val: data?.c2extra5,
                    note: data?.c2extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="매출이익" data={data} />
                <TrTitle title="미지급금" data={data} />
                {[
                  {
                    title: "원부자재(면세)",
                    val: data?.d1material,
                    note: data?.d1materialNote,
                  },
                  {
                    title: "매장관리비",
                    val: data?.d1storeMaint,
                    note: data?.d1storeMaintNote,
                  },
                  {
                    title: "전월이월금",
                    val: data?.d1carryover,
                    note: data?.d1carryoverNote,
                  },
                  {
                    title: data?.d1extra1name,
                    val: data?.d1extra1,
                    note: data?.d1extra1note,
                  },
                  {
                    title: data?.d1extra2name,
                    val: data?.d1extra2,
                    note: data?.d1extra2note,
                  },
                  {
                    title: data?.d1extra3name,
                    val: data?.d1extra3,
                    note: data?.d1extra3note,
                  },
                  {
                    title: data?.d1extra4name,
                    val: data?.d1extra4,
                    note: data?.d1extra4note,
                  },
                  {
                    title: data?.d1extra5name,
                    val: data?.d1extra5,
                    note: data?.d1extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="선수금" data={data} />
                {[
                  {
                    title: "현금매출",
                    val: data?.d2cash,
                    note: data?.d2cashNote,
                  },

                  {
                    title: data?.d2extra1name,
                    val: data?.d2extra1,
                    note: data?.d2extra1note,
                  },
                  {
                    title: data?.d2extra2name,
                    val: data?.d2extra2,
                    note: data?.d2extra2note,
                  },
                  {
                    title: data?.d2extra3name,
                    val: data?.d2extra3,
                    note: data?.d2extra3note,
                  },
                  {
                    title: data?.d2extra4name,
                    val: data?.d2extra4,
                    note: data?.d2extra4note,
                  },
                  {
                    title: data?.d2extra5name,
                    val: data?.d2extra5,
                    note: data?.d2extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
                ))}

                {/* ---------- */}
                <TrTitle title="선급금" data={data} />
                {[
                  {
                    title: "임대료",
                    val: data?.d3rent,
                    note: data?.d3rentNote,
                  },
                  {
                    title: "초도물품대",
                    val: data?.d3initProduct,
                    note: data?.d3initProductNote,
                  },
                  {
                    title: data?.d3extra1name,
                    val: data?.d3extra1,
                    note: data?.d3extra1note,
                  },
                  {
                    title: data?.d3extra2name,
                    val: data?.d3extra2,
                    note: data?.d3extra2note,
                  },
                  {
                    title: data?.d3extra3name,
                    val: data?.d3extra3,
                    note: data?.d3extra3note,
                  },
                  {
                    title: data?.d3extra4name,
                    val: data?.d3extra4,
                    note: data?.d3extra4note,
                  },
                  {
                    title: data?.d3extra5name,
                    val: data?.d3extra5,
                    note: data?.d3extra5note,
                  },
                ].map((item: any) => (
                  <Td title={item?.title} 대변={item?.val} 비고={item?.note} />
                ))}

                <TrTitle title="실입금액" data={data} />
              </tbody>
            </T.Table>
          </DragTable>
        )}
      </V.Column>
    </View>
  );
}

Index.auth = true;

//
const themes = {
  tab: {
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 14,
  } as Interpolation<Theme>,
} as const;
