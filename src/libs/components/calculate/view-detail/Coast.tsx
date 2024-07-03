import { Txt, TxtSpan, V } from "@/_ui";
import {
  addTableFieldsAtom,
  viewDetailAtom,
} from "@/libs/atoms/calculate/view";
import {
  AddFieldTab,
  AddTr,
  Thead,
  TitleTr,
  Tr,
} from "@/libs/components/calculate/view-detail/coast/index";
import { useMoment } from "@/libs/hooks";
import { useRecoilValue } from "recoil";
import { useAddField, Enum } from "./handler";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

export default function Coast() {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const { table } = Enum();
  useAddField();

  const tData = useRecoilValue(viewDetailAtom);
  const { settlementTotal } = tData ?? {};
  const addFields = useRecoilValue(addTableFieldsAtom);

  const 추가버튼유무 =
    settlementTotal.closedYn === "Y" || appUserStatus.rool !== "ROLE_USER";

  return (
    <V.ScrollDragHorizontal>
      <V.Column>
        <PrintTitle data={settlementTotal} />
        <Thead />

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="A" />
        <Tr {...table.현금} />
        <Tr {...table.세금계산서} />
        <Tr {...table.신용카드} />

        {addFields.includes("a1extra1") && <AddTr {...table.a1extra1} />}
        {addFields.includes("a1extra2") && <AddTr {...table.a1extra2} />}
        {addFields.includes("a1extra3") && <AddTr {...table.a1extra3} />}
        {addFields.includes("a1extra4") && <AddTr {...table.a1extra4} />}
        {addFields.includes("a1extra5") && <AddTr {...table.a1extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("a1extra1") &&
              addFields.includes("a1extra2") &&
              addFields.includes("a1extra3") &&
              addFields.includes("a1extra4") &&
              addFields.includes("a1extra5")
            ) && <AddFieldTab category="a1" name="상품매출액" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="B" />
        <TitleTr category="B_1" />
        <Tr {...table.임대료} />
        <Tr {...table.관리비} />
        <Tr {...table.전기요금} />
        <Tr {...table.도시가스} />
        <Tr {...table.인터넷} />
        <Tr {...table.기타경비} />
        {addFields.includes("b1extra1") && <AddTr {...table.b1extra1} />}
        {addFields.includes("b1extra2") && <AddTr {...table.b1extra2} />}
        {addFields.includes("b1extra3") && <AddTr {...table.b1extra3} />}
        {addFields.includes("b1extra4") && <AddTr {...table.b1extra4} />}
        {addFields.includes("extra5") && <AddTr {...table.b1extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("b1extra1") &&
              addFields.includes("b1extra2") &&
              addFields.includes("b1extra3") &&
              addFields.includes("b1extra4") &&
              addFields.includes("b1extra5")
            ) && <AddFieldTab category="b1" name="운영제경비" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

     

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="B_3" />
        <Tr {...table.원부자재과세} />
        <Tr {...table.기타비품} />
        {addFields.includes("b3extra1") && <AddTr {...table.b3extra1} />}
        {addFields.includes("b3extra2") && <AddTr {...table.b3extra2} />}
        {addFields.includes("b3extra3") && <AddTr {...table.b3extra3} />}
        {addFields.includes("b3extra4") && <AddTr {...table.b3extra4} />}
        {addFields.includes("b3extra5") && <AddTr {...table.b3extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("b3extra1") &&
              addFields.includes("b3extra2") &&
              addFields.includes("b3extra3") &&
              addFields.includes("b3extra4") &&
              addFields.includes("b3extra5")
            ) && <AddFieldTab category="b3" name="상품대" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="B_4" />
        <Tr {...table.초도물품대} />
        {addFields.includes("b4extra1") && <AddTr {...table.b4extra1} />}
        {addFields.includes("b4extra2") && <AddTr {...table.b4extra2} />}
        {addFields.includes("b4extra3") && <AddTr {...table.b4extra3} />}
        {addFields.includes("b4extra4") && <AddTr {...table.b4extra4} />}
        {addFields.includes("b4extra5") && <AddTr {...table.b4extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("b4extra1") &&
              addFields.includes("b4extra2") &&
              addFields.includes("b4extra3") &&
              addFields.includes("b4extra4") &&
              addFields.includes("b4extra5")
            ) && <AddFieldTab category="b4" name="기타" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="C" />
        <TitleTr category="C_1" />
        <Tr {...table.카드수수료} />
        <Tr {...table.관리비2} />
        <Tr {...table.전기요금2} />
        <Tr {...table.수도요금} />
        <Tr {...table.도시가스2} />
        <Tr {...table.배상책임보험} />
        <Tr {...table.기타경비2} />
        {addFields.includes("c1extra1") && <AddTr {...table.c1extra1} />}
        {addFields.includes("c1extra2") && <AddTr {...table.c1extra2} />}
        {addFields.includes("c1extra3") && <AddTr {...table.c1extra3} />}
        {addFields.includes("c1extra4") && <AddTr {...table.c1extra4} />}
        {addFields.includes("c1extra5") && <AddTr {...table.c1extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("c1extra1") &&
              addFields.includes("c1extra2") &&
              addFields.includes("c1extra3") &&
              addFields.includes("c1extra4") &&
              addFields.includes("c1extra5")
            ) && <AddFieldTab category="c1" name="기타제경비" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="C_2" />
        <Tr {...table.이자비용} />
        {addFields.includes("c2extra1") && <AddTr {...table.c2extra1} />}
        {addFields.includes("c2extra2") && <AddTr {...table.c2extra2} />}
        {addFields.includes("c2extra3") && <AddTr {...table.c2extra3} />}
        {addFields.includes("c2extra4") && <AddTr {...table.c2extra4} />}
        {addFields.includes("c2extra5") && <AddTr {...table.c2extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("c2extra1") &&
              addFields.includes("c2extra2") &&
              addFields.includes("c2extra3") &&
              addFields.includes("c2extra4") &&
              addFields.includes("c2extra5")
            ) && <AddFieldTab category="c2" name="기타" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="D" />
        <TitleTr category="D_1" />
        <Tr {...table.원부자재면세} />
        <Tr {...table.매장관리비} />
        <Tr {...table.전월이월금} />
        {addFields.includes("d1extra1") && <AddTr {...table.d1extra1} />}
        {addFields.includes("d1extra2") && <AddTr {...table.d1extra2} />}
        {addFields.includes("d1extra3") && <AddTr {...table.d1extra3} />}
        {addFields.includes("d1extra4") && <AddTr {...table.d1extra4} />}
        {addFields.includes("d1extra5") && <AddTr {...table.d1extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("d1extra1") &&
              addFields.includes("d1extra2") &&
              addFields.includes("d1extra3") &&
              addFields.includes("d1extra4") &&
              addFields.includes("d1extra5")
            ) && <AddFieldTab category="d1" name="미지급급" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="D_2" />
        <Tr {...table.현금매출} />
        {addFields.includes("d2extra1") && <AddTr {...table.d2extra1} />}
        {addFields.includes("d2extra2") && <AddTr {...table.d2extra2} />}
        {addFields.includes("d2extra3") && <AddTr {...table.d2extra3} />}
        {addFields.includes("d2extra4") && <AddTr {...table.d2extra4} />}
        {addFields.includes("d2extra5") && <AddTr {...table.d2extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("d2extra1") &&
              addFields.includes("d2extra2") &&
              addFields.includes("d2extra3") &&
              addFields.includes("d2extra4") &&
              addFields.includes("d2extra5")
            ) && <AddFieldTab category="d2" name="선수금" />}
          </>
        )}

        {/* ----------- */}
        {/* ----------- */}

        <TitleTr category="D_3" />
        <Tr {...table.임대료2} />
        <Tr {...table.초도물품대2} />
        {addFields.includes("d3extra1") && <AddTr {...table.d3extra1} />}
        {addFields.includes("d3extra2") && <AddTr {...table.d3extra2} />}
        {addFields.includes("d3extra3") && <AddTr {...table.d3extra3} />}
        {addFields.includes("d3extra4") && <AddTr {...table.d3extra4} />}
        {addFields.includes("d3extra5") && <AddTr {...table.d3extra5} />}
        {추가버튼유무 && (
          <>
            {!(
              addFields.includes("d3extra1") &&
              addFields.includes("d3extra2") &&
              addFields.includes("d3extra3") &&
              addFields.includes("d3extra4") &&
              addFields.includes("d3extra5")
            ) && <AddFieldTab category="d3" name="선급금" />}
          </>
        )}
        <TitleTr category="E" />
      </V.Column>
    </V.ScrollDragHorizontal>
  );
}

//
// 프린트 타이틀
const PrintTitle = ({ data }: { data: any }) => (
  <V.Column
    padding={{ all: 10, bottom: 30 }}
    gap={8}
    css={{
      display: "none",
      "@media print": { display: "flex" },
    }}
  >
    <Txt as="b" size={16}>
      {data?.settlementTitle ?? ""}
    </Txt>

    <V.Row gap={16} crossGap={16} wrap="wrap">
      <TxtSpan size={12}>매장명 : {data?.storeName}</TxtSpan>

      <TxtSpan size={12}>
        점주명 : {data?.owner ? data?.owner : "준비 중 .."}
      </TxtSpan>
     

      <TxtSpan size={12}>
        정산일 : {useMoment(data?.settlementYmd).format("yyyy년mm월dd일")}
      </TxtSpan>
    </V.Row>
  </V.Column>
);
