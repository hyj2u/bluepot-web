import { LoadingSpinner, Spacing, T, Txt } from "@/_ui";

//components
import { DragTable, Title, View } from "@/libs/components/app";
import { Readers, Thead, Tbody } from "@/libs/components/calculate/auto";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllAutos } from "@/_https/calculate/auto";
import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useMoment } from "@/libs/hooks";
import useExportToExcel from "@/libs/hooks/useExportTableToExcel";

//
export default function Index() {
  const { axiosInstance, queryKeys, useQuery } = useTanstackQuery();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.auto.table],
    queryFn: () => getAllAutos({ axiosInstance }),
  });

  const tableRef = useRef<HTMLTableElement>(null);

  // 엑셀 기능
  const { onDownload: onDownloadExcel } = useDownloadExcel({
    sheet: "detail-receipt",
    currentTableRef: tableRef.current,
    filename: "정산자동화",
  });

  const exportToExcel = useExportToExcel();
  const excelFileName = "정산자동화" + ".xlsx";

  return (
    <View>
      <Title
        as="정산자동화"
        txt={`[대상년월 ${useMoment("").previousMonth("yyyy-mm")}]`}
      />

      <Spacing size={10} />
      <Txt>✋ 옆으로 밀어서 정산정보를 더 확인할 수 있습니다 </Txt>

      <Spacing size={20} />

      <Readers onDownloadExcel={() => exportToExcel(tableRef, excelFileName)} />

      <Spacing size={20} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DragTable>
          <table
            ref={tableRef}
            css={{
              borderStyle: "none",
              borderSpacing: 0,
              borderCollapse: "collapse",
            }}
          >
            <Thead />
            <tbody>
              {data?.data.map((item: any) => <Tbody data={item} />)}
            </tbody>
          </table>
        </DragTable>
      )}
    </View>
  );
}

Index.auth = true;
