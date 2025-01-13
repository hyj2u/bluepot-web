import { useRef } from "react";
import { useRouter } from "next/router";

//libs
import { Spacing } from "@/_ui";

//components
import { DragTable, Title, View } from "@/libs/components/app";
import {
  Filter,
  TbodyContainer,
  TheadContainer,
} from "@/libs/components/calculate/receipt";

//hooks
import { useDownloadExcel } from "react-export-table-to-excel";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllReceipts } from "@/_https/calculate/receipts";
import useExportToExcel from "@/libs/hooks/useExportTableToExcel";

//
export default function Index() {
  const tableRef = useRef<HTMLTableElement>(null);
  const router = useRouter();
  const { queryKeys, useQuery, axiosInstance } = useTanstackQuery();
 // activeYn 기본값 설정
 const activeYn = router.query.activeYn ?? "Y";
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.receipts.all, router.query.date, activeYn],
    queryFn: () =>
      getAllReceipts({
        axiosInstance,
        date: router.query.date ?? "2024",
        activeYn, // activeYn 전달
      }),
  });

  const exportToExcel = useExportToExcel();
  const excelFileName =
    "입금/세금계산서/총괄표" +
    "_" +
    (router.query.date ?? "2024") +
    "년" +
    ".xlsx";
      // activeYn 상태 변경 함수
  const handleActiveYnChange = (newActiveYn: string) => {
    router.replace({
      query: { ...router.query, activeYn: newActiveYn },
    });
  };


  return (
    <View loading={isLoading}>
      <Title as="입금/세금계산서/총괄표" />

      <Spacing size={20} />

      <Filter onDownloadExcel={() => exportToExcel(tableRef, excelFileName)}
       activeYn={activeYn}
       onActiveYnChange={handleActiveYnChange} // 상태 변경 함수 전달
       />

      <Spacing size={30} />
      <DragTable>
        <table
          ref={tableRef}
          css={{
            maxWidth: 640,
            borderStyle: "none",
            borderSpacing: 0,
            borderCollapse: "collapse",
          }}
        >
          <TheadContainer />
          <TbodyContainer data={data} />
        </table>
      </DragTable>
    </View>
  );
}

Index.auth = true;
