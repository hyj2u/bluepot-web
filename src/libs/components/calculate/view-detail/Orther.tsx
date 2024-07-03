import { Txt, V } from "@/_ui";
import { AddTab, Thead, Tr } from "./other";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilValue } from "recoil";

export default function Orther() {
  const detail = useRecoilValue(viewDetailAtom);
  const { extraSupplies } = detail || {};

  return (
    <V.Column>
      <Txt as="b" css={{ "@media print": { fontSize: "14px" } }}>
        기타비품
      </Txt>

      <V.ScrollDragHorizontal>
        <V.Column>
          <Thead />

          {extraSupplies?.map((item: any) => (
            <V.Container key={item.pkey}>
              <Tr data={item} />
            </V.Container>
          ))}
        </V.Column>
      </V.ScrollDragHorizontal>

      <AddTab />
    </V.Column>
  );
}
