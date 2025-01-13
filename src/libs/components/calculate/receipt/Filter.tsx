import { Select, TouchableOpacity, TxtSpan, V, Checkbox } from "@/_ui";
import { ExcelIcon } from "@/libs/assets/icon-color";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
export default function Filter({
  onDownloadExcel,
  activeYn,
  onActiveYnChange,
}: {
  onDownloadExcel: any;
  activeYn: string;
  onActiveYnChange: (newActiveYn: string) => void;
}) {
  const router = useRouter();

  return (
    <>
      <V.Row gap={16} maxWidth={400} align="center">
        {/* 연도 선택 Select */}
        <Select
          options={["2023", "2024", "2025"]}
          value={router.query.date ?? "2024"}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            router.replace(
              { query: { ...router.query, date: e.target.value } },
              undefined,
              {
                scroll: false,
                shallow: true,
              }
            )
          }
          renderItem={(item: any) => (
            <Select.Option value={item} key={item}>
              {item}년
            </Select.Option>
          )}
        />

      

        {/* 엑셀 다운로드 버튼 */}
        <TouchableOpacity
          borderRadius={14}
          padding={{ all: 12 }}
          backgroundColor="#f6f6f6"
          gap={6}
          minHeight={50}
          onClick={onDownloadExcel}
        >
          <ExcelIcon />
          <TxtSpan color="#2E7D32" size={14}>
            엑셀 다운로드
          </TxtSpan>
        </TouchableOpacity>
          {/* 매장 체크박스 */}
          <V.Row align="center" gap={8}>
          <Checkbox
            label={{ title: "폐점매장 제외" }}
            checked={activeYn === "Y"}
            onChange={() => onActiveYnChange(activeYn === "Y" ? "N" : "Y")}
          />
        </V.Row>
      </V.Row>
    </>
  );
}
