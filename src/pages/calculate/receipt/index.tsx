import { useRef } from "react";
import { useRouter } from "next/router";

//libs
import { LoadingSpinner, Spacing, T, V } from "@/_ui";

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

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.receipts.all, router.query.date],
    queryFn: () =>
      getAllReceipts({ axiosInstance, date: router.query.date ?? "2024" }),
  });

  const exportToExcel = useExportToExcel();
  const excelFileName =
    "입금/세금계산서/총괄표" +
    "_" +
    (router.query.date ?? "2024") +
    "년" +
    ".xlsx";

  return (
    <View>
      <Title as="입금/세금계산서/총괄표" />

      <Spacing size={20} />

      <Filter onDownloadExcel={() => exportToExcel(tableRef, excelFileName)} />

      <Spacing size={30} />

      {isLoading ? (
        <V.Column width="100%" crossAlign="center" align="center">
          <LoadingSpinner />
        </V.Column>
      ) : (
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
      )}
    </View>
  );
}

Index.auth = true;
