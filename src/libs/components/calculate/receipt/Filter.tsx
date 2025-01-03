import { Select, TouchableOpacity, TxtSpan, V } from "@/_ui";
import { ExcelIcon } from "@/libs/assets/icon-color";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default function Filter({ onDownloadExcel }: { onDownloadExcel: any }) {
  const router = useRouter();

  return (
    <>
      <V.Row gap={16} maxWidth={260}>
        <Select
          options={["2023", "2024", "2025"]}
          value={router.query.date ?? "2024"}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            router.replace({ query: { date: e.target.value } }, undefined, {
              scroll: false,
              shallow: true,
            })
          }
          renderItem={(item: any) => (
            <Select.Option value={item} key={item}>
              {item}년
            </Select.Option>
          )}
        />

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
      </V.Row>
    </>
  );
}
