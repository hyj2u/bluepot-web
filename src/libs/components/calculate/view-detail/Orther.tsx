import { Txt, V } from "@/_ui";
import { AddTab, Thead, Tr } from "./other";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilValue } from "recoil";

export default function Orther() {
  const detail = useRecoilValue(viewDetailAtom);
  const { extraSupplies } = detail || {};

  return (
    <V.Column
      css={{
        "@media print": {
          width: "100%", // 부모 컨테이너 너비를 100%로 설정
          padding: 0, // 불필요한 여백 제거
        },
      }}
    >
      <Txt
        as="b"
        css={{
          "@media print": {
            fontSize: "14px", // 인쇄 시 글자 크기 조정
          },
        }}
      >
        기타비품
      </Txt>

      <V.ScrollDragHorizontal
        css={{
          "@media print": {
            overflow: "visible", // 스크롤 제거
            width: "100%", // 너비를 100%로 설정
          },
        }}
      >
        <V.Column>
          <Thead />

          {extraSupplies?.map((item: any) => (
            <V.Container
              key={item.pkey}
              css={{
                "@media print": {
                  width: "100%", // 각 항목의 컨테이너 너비를 100%로 설정
                  borderBottom: "1px solid #ccc", // 인쇄 시 경계선 추가
                },
              }}
            >
              <Tr data={item} />
            </V.Container>
          ))}
        </V.Column>
      </V.ScrollDragHorizontal>

      <AddTab
      />
    </V.Column>
  );
}
