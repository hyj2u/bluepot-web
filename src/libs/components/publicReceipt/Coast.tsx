import { useRouter } from "next/router";

//libs
import { V } from "@/_ui";
import { Thead, TrTitle, Td } from "../calculate/receipt-view";

//
export const Coast = ({ data }: { data: any }) => {
  return (
    <V.ScrollDragHorizontal>
      <table
        css={{
          width: "100%",
          borderStyle: "none",
          borderSpacing: 0,
          borderCollapse: "collapse",
        }}
      >
        <Thead />

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
            extra: true,
          },
          {
            title: data?.a1extra2name,
            val: data?.a1extra2,
            note: data?.a1extra2Note,
            extra: true,
          },
          {
            title: data?.a1extra3name,
            val: data?.a1extra3,
            note: data?.a1extra3Note,
            extra: true,
          },
          {
            title: data?.a1extra4name,
            val: data?.a1extra4,
            note: data?.a1extra4Note,
            extra: true,
          },
          {
            title: data?.a1extra5name,
            val: data?.a1extra5,
            note: data?.a1extra5Note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 대변={item?.val} 비고={item?.note} />
            )}
          </>
        ))}

        {/* ---------- */}
        <TrTitle title="매출원가" data={data} />

        {/* ---------- */}
        <TrTitle title="운영제경비" data={data} />

        {/* ---------- */}
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
            extra: true,
          },
          {
            title: data?.b1extra2name,
            val: data?.b1extra2,
            note: data?.b1extra2note,
            extra: true,
          },
          {
            title: data?.b1extra3name,
            val: data?.b1extra3,
            note: data?.b1extra3note,
            extra: true,
          },
          {
            title: data?.b1extra4name,
            val: data?.b1extra4,
            note: data?.b1extra4note,
            extra: true,
          },
          {
            title: data?.b1extra5name,
            val: data?.b1extra5,
            note: data?.b1extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            extra: true,
          },
          {
            title: data?.b3extra2name,
            val: data?.b3extra2,
            note: data?.b3extra2note,
            extra: true,
          },
          {
            title: data?.b3extra3name,
            val: data?.b3extra3,
            note: data?.b3extra3note,
            extra: true,
          },
          {
            title: data?.b3extra4name,
            val: data?.b3extra4,
            note: data?.b3extra4note,
            extra: true,
          },
          {
            title: data?.b3extra5name,
            val: data?.b3extra5,
            note: data?.b3extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            title: "기부금",
            val: data?.b4donation,
            note: data?.b4donationNote,
          },
          {
            title: data?.b4extra1name,
            val: data?.b4extra1,
            note: data?.b4extra1note,
            extra: true,
          },
          {
            title: data?.b4extra2name,
            val: data?.b4extra2,
            note: data?.b4extra2note,
            extra: true,
          },
          {
            title: data?.b4extra3name,
            val: data?.b4extra3,
            note: data?.b4extra3note,
            extra: true,
          },
          {
            title: data?.b4extra4name,
            val: data?.b4extra4,
            note: data?.b4extra4note,
            extra: true,
          },
          {
            title: data?.b4extra5name,
            val: data?.b4extra5,
            note: data?.b4extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            extra: true,
          },
          {
            title: data?.c1extra2name,
            val: data?.c1extra2,
            note: data?.c1extra2note,
            extra: true,
          },
          {
            title: data?.c1extra3name,
            val: data?.c1extra3,
            note: data?.c1extra3note,
            extra: true,
          },
          {
            title: data?.c1extra4name,
            val: data?.c1extra4,
            note: data?.c1extra4note,
            extra: true,
          },
          {
            title: data?.c1extra5name,
            val: data?.c1extra5,
            note: data?.c1extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            extra: true,
          },
          {
            title: data?.c2extra2name,
            val: data?.c2extra2,
            note: data?.c2extra2note,
            extra: true,
          },
          {
            title: data?.c2extra3name,
            val: data?.c2extra3,
            note: data?.c2extra3note,
            extra: true,
          },
          {
            title: data?.c2extra4name,
            val: data?.c2extra4,
            note: data?.c2extra4note,
            extra: true,
          },
          {
            title: data?.c2extra5name,
            val: data?.c2extra5,
            note: data?.c2extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            extra: true,
          },
          {
            title: data?.d1extra2name,
            val: data?.d1extra2,
            note: data?.d1extra2note,
            extra: true,
          },
          {
            title: data?.d1extra3name,
            val: data?.d1extra3,
            note: data?.d1extra3note,
            extra: true,
          },
          {
            title: data?.d1extra4name,
            val: data?.d1extra4,
            note: data?.d1extra4note,
            extra: true,
          },
          {
            title: data?.d1extra5name,
            val: data?.d1extra5,
            note: data?.d1extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            extra: true,
          },
          {
            title: data?.d2extra2name,
            val: data?.d2extra2,
            note: data?.d2extra2note,
            extra: true,
          },
          {
            title: data?.d2extra3name,
            val: data?.d2extra3,
            note: data?.d2extra3note,
            extra: true,
          },
          {
            title: data?.d2extra4name,
            val: data?.d2extra4,
            note: data?.d2extra4note,
            extra: true,
          },
          {
            title: data?.d2extra5name,
            val: data?.d2extra5,
            note: data?.d2extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 차변={item?.val} 비고={item?.note} />
            )}
          </>
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
            extra: true,
          },
          {
            title: data?.d3extra2name,
            val: data?.d3extra2,
            note: data?.d3extra2note,
            extra: true,
          },
          {
            title: data?.d3extra3name,
            val: data?.d3extra3,
            note: data?.d3extra3note,
            extra: true,
          },
          {
            title: data?.d3extra4name,
            val: data?.d3extra4,
            note: data?.d3extra4note,
            extra: true,
          },
          {
            title: data?.d3extra5name,
            val: data?.d3extra5,
            note: data?.d3extra5note,
            extra: true,
          },
        ].map((item: any) => (
          <>
            {item.extra && item?.val === 0 ? (
              ""
            ) : (
              <Td title={item?.title} 대변={item?.val} 비고={item?.note} />
            )}
          </>
        ))}

        {/* ---------- */}
        <TrTitle title="실입금액" data={data} />
      </table>
    </V.ScrollDragHorizontal>
  );
};
